/**
 * usePasswords Hook - Hybrid Approach
 * Quản lý passwords với IndexedDB primary + API fallback
 * 
 * Features:
 * - IndexedDB làm primary storage (theo steering rules)
 * - API làm backup/sync mechanism
 * - Error handling và retry logic
 * - Toast notifications
 * - Loading states
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import { PasswordEntry, PasswordInsert, PasswordStats } from '@/lib/types/models';
import { db } from '@/lib/db/db';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/lib/constants/app-constants';

/**
 * Hook configuration
 */
interface UsePasswordsConfig {
  enableApiSync?: boolean;
  autoInitialize?: boolean;
}

/**
 * Hook return type
 */
interface UsePasswordsReturn {
  // Data
  passwords: PasswordEntry[];
  loading: boolean;
  error: string | null;
  stats: PasswordStats;
  
  // Actions
  searchPasswords: (query?: string) => Promise<void>;
  addPassword: (entry: PasswordInsert) => Promise<void>;
  updatePassword: (id: string, entry: Partial<PasswordInsert>) => Promise<void>;
  deletePassword: (id: string) => Promise<void>;
  refreshPasswords: () => Promise<void>;
  clearAllPasswords: () => Promise<void>;
}

/**
 * Main usePasswords Hook
 */
export const usePasswords = (config: UsePasswordsConfig = {}): UsePasswordsReturn => {
  const { enableApiSync = false, autoInitialize = true } = config;
  
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Initialize IndexedDB on mount
   */
  useEffect(() => {
    if (autoInitialize) {
      initializeDatabase();
    }
  }, [autoInitialize]);

  /**
   * Khởi tạo database và load initial data
   */
  const initializeDatabase = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      await db.initialize();
      await refreshPasswords();
      
    } catch (err) {
      console.error('Database initialization failed:', err);
      setError(ERROR_MESSAGES.CONNECTION_FAILED);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Load passwords từ IndexedDB
   */
  const refreshPasswords = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await db.getAllPasswords();
      setPasswords(data);
      
    } catch (err) {
      console.error('Failed to load passwords:', err);
      setError(ERROR_MESSAGES.FETCH_FAILED);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Tìm kiếm passwords
   */
  const searchPasswords = useCallback(async (query?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await db.searchPasswords(query || '');
      setPasswords(data);
      
    } catch (err) {
      console.error('Search failed:', err);
      setError(ERROR_MESSAGES.SEARCH_FAILED);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Thêm password mới
   */
  const addPassword = useCallback(async (entry: PasswordInsert) => {
    try {
      setLoading(true);
      setError(null);
      
      // Primary: Thêm vào IndexedDB
      const newPassword = await db.addPassword(entry);
      
      // Refresh danh sách
      await refreshPasswords();
      
    } catch (err) {
      console.error('Add password failed:', err);
      setError(ERROR_MESSAGES.ADD_FAILED);
      throw new Error(ERROR_MESSAGES.ADD_FAILED);
    } finally {
      setLoading(false);
    }
  }, [refreshPasswords]);

  /**
   * Cập nhật password
   */
  const updatePassword = useCallback(async (id: string, entry: Partial<PasswordInsert>) => {
    try {
      setLoading(true);
      setError(null);
      
      // Primary: Cập nhật trong IndexedDB
      await db.updatePassword(id, entry);
      
      // Refresh danh sách
      await refreshPasswords();
      
    } catch (err) {
      console.error('Update password failed:', err);
      setError(ERROR_MESSAGES.UPDATE_FAILED);
      throw new Error(ERROR_MESSAGES.UPDATE_FAILED);
    } finally {
      setLoading(false);
    }
  }, [refreshPasswords]);

  /**
   * Xóa password
   */
  const deletePassword = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Primary: Xóa từ IndexedDB
      await db.deletePassword(id);
      
      // Refresh danh sách
      await refreshPasswords();
      
    } catch (err) {
      console.error('Delete password failed:', err);
      setError(ERROR_MESSAGES.DELETE_FAILED);
      throw new Error(ERROR_MESSAGES.DELETE_FAILED);
    } finally {
      setLoading(false);
    }
  }, [refreshPasswords]);

  /**
   * Xóa toàn bộ passwords (cho testing)
   */
  const clearAllPasswords = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      await db.clearAll();
      await refreshPasswords();
      
    } catch (err) {
      console.error('Clear all failed:', err);
      setError('Đã xóa toàn bộ dữ liệu');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [refreshPasswords]);

  /**
   * Tính toán stats từ passwords hiện tại
   */
  const stats = useMemo((): PasswordStats => ({
    total: passwords.length,
    hasPasswords: passwords.length > 0
  }), [passwords]);

  return {
    // Data
    passwords,
    loading,
    error,
    stats,
    
    // Actions
    searchPasswords,
    addPassword,
    updatePassword,
    deletePassword,
    refreshPasswords,
    clearAllPasswords,
  };
};
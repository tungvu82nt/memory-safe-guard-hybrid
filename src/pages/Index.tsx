import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Shield } from "lucide-react";
import { PasswordCard } from "@/components/PasswordCard";
import { PasswordForm } from "@/components/PasswordForm";
import { SearchBar } from "@/components/SearchBar";
import { usePasswords } from "@/hooks/use-passwords";
import { PasswordEntry, PasswordInsert } from "@/lib/types/models";
import { TIMING } from "@/lib/constants/app-constants";

/**
 * Trang chính của ứng dụng Memory Safe Guard
 * Hiển thị danh sách mật khẩu và các chức năng quản lý
 */
const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editEntry, setEditEntry] = useState<PasswordEntry | undefined>();

  // Sử dụng hook quản lý passwords
  const {
    passwords,
    loading,
    error,
    stats,
    searchPasswords,
    addPassword,
    updatePassword,
    deletePassword,
  } = usePasswords({ autoInitialize: true });

  // Tìm kiếm với debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchPasswords(searchQuery);
    }, TIMING.SEARCH_DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchPasswords]);

  // Handler cho form
  const handleOpenAddForm = () => {
    setEditEntry(undefined);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (entry: PasswordEntry) => {
    setEditEntry(entry);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditEntry(undefined);
  };

  const handleSave = async (entryData: PasswordInsert) => {
    try {
      if (editEntry) {
        await updatePassword(editEntry.id, entryData);
        alert("Mật khẩu đã được cập nhật");
      } else {
        await addPassword(entryData);
        alert("Mật khẩu mới đã được thêm");
      }
    } catch (err) {
      alert("Có lỗi xảy ra: " + (err instanceof Error ? err.message : "Lỗi không xác định"));
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa mật khẩu này?")) {
      try {
        await deletePassword(id);
        alert("Mật khẩu đã được xóa");
      } catch (err) {
        alert("Có lỗi khi xóa mật khẩu");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="glass-effect sticky top-0 z-50 border-b border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-primary pulse-glow">
                <Shield className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gradient">Memory Safe Guard</h1>
                <p className="text-muted-foreground font-medium">Quản lý mật khẩu an toàn và hiện đại</p>
              </div>
            </div>
            <Button
              onClick={handleOpenAddForm}
              className="gap-2 shadow-button hover:shadow-glow transition-all duration-300 px-6 py-3"
            >
              <Plus className="w-5 h-5" />
              Thêm mật khẩu
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex-1">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Bảo vệ mật khẩu của bạn
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Lưu trữ và quản lý tất cả mật khẩu của bạn một cách an toàn với công nghệ bảo mật hiện đại.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto mb-12">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Stats */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground">
            Tổng cộng: <span className="font-semibold text-primary">{stats.total}</span> mật khẩu
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Đang tải...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Lỗi: {error}</p>
          </div>
        ) : passwords.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {passwords.map((entry) => (
              <PasswordCard
                key={entry.id}
                entry={entry}
                onEdit={handleOpenEditForm}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {searchQuery ? "Không tìm thấy kết quả" : "Chưa có mật khẩu nào"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery 
                ? `Không có mật khẩu nào khớp với "${searchQuery}"`
                : "Hãy thêm mật khẩu đầu tiên của bạn"
              }
            </p>
            <Button onClick={handleOpenAddForm} className="gap-2">
              <Plus className="w-4 h-4" />
              Thêm mật khẩu đầu tiên
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 Memory Safe Guard. Lưu trữ mật khẩu an toàn với IndexedDB.</p>
        </div>
      </footer>

      {/* Form Modal */}
      <PasswordForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSave}
        editEntry={editEntry}
      />
    </div>
  );
};

export default Index;
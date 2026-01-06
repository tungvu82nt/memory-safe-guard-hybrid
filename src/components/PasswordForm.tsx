import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordEntry, PasswordInsert } from "@/lib/types/models";

interface PasswordFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: PasswordInsert) => void;
  editEntry?: PasswordEntry;
}

export const PasswordForm = ({ isOpen, onClose, onSave, editEntry }: PasswordFormProps) => {
  const [formData, setFormData] = useState<PasswordInsert>({
    service: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (editEntry) {
      setFormData({
        service: editEntry.service,
        username: editEntry.username,
        password: editEntry.password,
      });
    } else {
      setFormData({
        service: "",
        username: "",
        password: "",
      });
    }
  }, [editEntry, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.service && formData.username && formData.password) {
      onSave(formData);
      onClose();
    }
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, password });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editEntry ? "Chỉnh sửa mật khẩu" : "Thêm mật khẩu mới"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service">Dịch vụ</Label>
            <Input
              id="service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              placeholder="Tên dịch vụ hoặc website"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="username">Tên đăng nhập</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Email hoặc tên đăng nhập"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="flex gap-2">
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Mật khẩu"
                required
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={generatePassword}
                className="whitespace-nowrap"
              >
                Tạo ngẫu nhiên
              </Button>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">
              {editEntry ? "Cập nhật" : "Lưu"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
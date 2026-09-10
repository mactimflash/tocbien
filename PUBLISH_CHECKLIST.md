# Publish checklist

## Trước khi cập nhật website

- [ ] Upload `LOL_Coach_Control_v2.7_Native.exe` và installer tương ứng vào
      một GitHub Release mới.
- [ ] Đặt release là prerelease cho tới khi Windows QA và policy review hoàn
      tất.
- [ ] Đăng SHA-256 của EXE và installer trong release notes.
- [ ] Không dùng asset `tocbien.exe` cũ để minh họa cho v2.7 Native.
- [ ] Xác nhận các nút tải tại `/releases` dẫn tới đúng bản native mới.
- [ ] Kiểm tra website tại 360 px, 768 px, 1366 px và 1920 px.
- [ ] Kiểm tra QR MoMo thực tế trước khi public.
- [ ] Hoàn thành Authenticode signing trước khi gọi là bản phát hành chính thức.
- [ ] Hoàn thành Riot policy/trademark/legal review.

## Metadata GitHub đề xuất

Repository description:

```text
Website và bản tải thử nghiệm của LOL Macro Helper Tool v2.7 Native cho Windows 10/11 x64.
```

Website:

```text
https://lmht.pages.dev
```

Release title đề xuất:

```text
LOL Macro Helper Tool v2.7 Native — Experimental RC
```

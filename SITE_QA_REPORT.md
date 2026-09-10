# Website QA report

Ngày kiểm tra: 2026-09-10  
Repo baseline: `mactimflash/tocbien` commit
`5d14283a748587d1827758f8d464d121635d3923`

## Automated checks

| Kiểm tra | Kết quả |
|---|---|
| HTML UTF-8 và cấu trúc parse được | PASS |
| ID không trùng và anchor nội bộ có đích | PASS |
| Tất cả asset local được tham chiếu đều tồn tại | PASS |
| Ảnh có alt text | PASS |
| Chỉ có một H1 | PASS |
| JSON-LD parse hợp lệ | PASS |
| `sitemap.xml` parse hợp lệ | PASS |
| JavaScript `node --check` | PASS |
| Git whitespace `git diff --check` | PASS |
| Không còn bảng giá/giá thuê cũ | PASS |
| Không còn page-view/IP/User-Agent/Telegram tracking | PASS |
| HTTP local trả 200 cho HTML/CSS/JS/icon/QR/robots/sitemap | PASS |
| `donate_qr.png` giữ nguyên SHA-256 | PASS |

SHA-256 QR:

```text
3fe6f997f80d039b9b6640f2fe2948456679f0c04e398c79fb3421d6f0b99b6e
```

## Responsive/accessibility đã triển khai trong source

- Breakpoint 900 px và 640 px.
- Menu mobile có `aria-expanded`, phím Escape và tự đóng khi chọn liên kết.
- Focus state rõ ràng, skip link, reduced-motion và forced-colors.
- App preview chuyển từ ba cột sang hai cột trên màn hình nhỏ.
- QR dùng `width: min(100%, 280px)` để không tràn khung.

## Chưa được xác nhận trực quan

Headless Chromium không tải được trong môi trường build do CDN timeout, nên
chưa có pixel/screenshot QA thực tế. Trước khi public, cần mở website trên
Chrome/Edge và kiểm tra thủ công ở 360 px, 768 px, 1366 px và 1920 px.

## Release blocker

GitHub Release công khai hiện vẫn là bản `tocbien.exe` cũ. Chủ repo phải upload
candidate `LOL_Coach_Control_v2.7_Native.exe`, installer và SHA-256 trước khi
website v2.7 được public. Xem `PUBLISH_CHECKLIST.md`.

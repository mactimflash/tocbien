# LOL Macro Helper Tool v2.7 Native — website

Source tĩnh cho website giới thiệu **LOL Macro Helper Tool v2.7 Native** tại
<https://lmht.pages.dev>.

Giao diện được thiết kế theo tinh thần của một tiện ích Windows cổ điển: nội
dung ngắn, tải về rõ ràng, ít hiệu ứng và không sử dụng branding, logo hay mã
nguồn của UniKey.

## Nội dung chính

- Giới thiệu ứng dụng native C++ dành cho Windows 10/11 x64.
- Minh họa giao diện Compact bằng HTML/CSS, không sử dụng artwork game.
- Hướng dẫn học, xóa và phát lại điểm ping.
- Bảng phím tắt cố định của v2.7 Native.
- Mô tả Flash Tracker, trạng thái League Client, system tray và Auto Accept
  thử nghiệm.
- Khu vực tải miễn phí trỏ tới GitHub Releases.
- Cảnh báo rõ đây là release candidate chưa ký số và cần policy review.
- Khu vực MoMo Donate giữ nguyên tài nguyên `donate_qr.png`.

Website không còn:

- giá thuê theo giờ hoặc theo ngày;
- gói mua vĩnh viễn;
- license khóa theo Machine ID;
- CTA thuê/mua qua Telegram;
- page-view tracking gửi IP, User-Agent hoặc referrer ra Telegram.

## Chạy thử tại máy

Không có bước build và không cần cài dependency:

```bash
python -m http.server 8080
```

Sau đó mở <http://localhost:8080>.

## Triển khai

Có thể deploy trực tiếp thư mục gốc lên Cloudflare Pages hoặc GitHub Pages:

- Build command: để trống
- Output directory: `/`
- Production domain: `https://lmht.pages.dev`

Nút tải phần mềm đang trỏ tới:

<https://github.com/mactimflash/tocbien/releases>

## Cấu trúc

```text
index.html       Nội dung và cấu trúc trang
styles.css       Giao diện desktop/mobile và High Contrast
script.js        Menu mobile và năm bản quyền
favicon.ico      Favicon hiện có
donate_qr.png    QR MoMo Donate hiện có
robots.txt       Chỉ dẫn crawler
sitemap.xml      URL canonical của website
CHANGELOG.md     Lịch sử thay đổi website
PUBLISH_CHECKLIST.md  Checklist cập nhật release và metadata GitHub
SITE_QA_REPORT.md     Kết quả kiểm tra và giới hạn visual QA
SOURCE_MANIFEST.sha256  SHA-256 của toàn bộ file bàn giao
```

## Bảo toàn QR MoMo

Đường dẫn trong HTML tiếp tục là:

```html
<img src="donate_qr.png" alt="Mã QR MoMo Donate" class="donate-qr">
```

SHA-256 của file QR tại thời điểm cập nhật:

```text
3fe6f997f80d039b9b6640f2fe2948456679f0c04e398c79fb3421d6f0b99b6e
```

## Quyền riêng tư

Website không gửi analytics hoặc telemetry tùy chỉnh. `script.js` chỉ điều
khiển menu responsive và hiển thị năm hiện tại.

## Trạng thái phát hành

Ứng dụng đang được giới thiệu dưới dạng **unsigned release candidate**. Trước
khi phát hành công khai rộng rãi cần hoàn thành Windows QA, ký Authenticode và
đánh giá lại Flash tracking, replay input, Auto Accept, tên sản phẩm và legal
notice theo chính sách Riot hiện hành.

LOL Macro Helper Tool là dự án độc lập, không được Riot Games tài trợ, chứng
thực hoặc vận hành. Các nhãn hiệu liên quan thuộc chủ sở hữu tương ứng.

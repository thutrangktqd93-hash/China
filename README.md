# Hán Ngữ 3.0 Luyện Tập

Web tự học tiếng Trung cho người mới bắt đầu, theo **chuẩn HSK 3.0 cấp 1** (506 từ).

**Mở web:** https://thutrangktqd93-hash.github.io/China/

## Chuyên mục

| Mục | Nội dung |
|---|---|
| Học từ vựng | 506 từ chia 22 bài theo chủ đề, thẻ từ có pinyin tô màu thanh điệu, câu mẫu, flashcard lặp lại ngắt quãng, 3 game (Ghép cặp, Thử thách tốc độ, Bắt thanh điệu) và 3 bài luyện nghe |
| Mưa từ vựng | Nghĩa tiếng Việt hoặc âm thanh rơi xuống, gõ pinyin để bắn hạ; gõ số thanh điệu để nhân đôi điểm, có trùm cuối mỗi cấp và bám đuổi từ yếu |
| Luyện viết | Xem thứ tự nét và tự viết trên ô Mễ tự cách, báo nét sai (dùng thư viện Hanzi Writer) |
| Pinyin | Thanh điệu, 23 thanh mẫu, 36 vận mẫu có âm thanh; luyện nghe thanh điệu và cặp âm dễ nhầm |
| Luyện nói | Đọc to câu/từ, nhận dạng giọng nói và chấm điểm từng chữ |
| Hội thoại | 10 tình huống, nghe cả bài, đóng vai A/B có chấm điểm, luyện xếp câu |
| Ngữ pháp | 16 điểm ngữ pháp HSK 1, 20 lượng từ, bài tập điền từ và sắp xếp câu |
| Bộ thủ | 214 bộ thủ lọc theo số nét, ví dụ chữ HSK 1, trò chơi đoán nghĩa |
| Thi thử | Đề mô phỏng 40 câu nghe + đọc, 30 phút, chấm điểm và xem lại câu sai |

## Ghi chú

- Giọng đọc dùng giọng tiếng Trung có sẵn trên thiết bị; luyện nói cần Chrome/Edge (máy tính, Android) hoặc Safari (iPhone) và quyền dùng micro.
- Danh sách từ theo chuẩn HSK 3.0 (GF0025-2021). Nghĩa tiếng Việt, câu mẫu, hội thoại và đề thi thử được biên soạn để tự học, không phải tài liệu chính thức.
- Tiến độ học lưu trong trình duyệt của từng người.

## Cấu trúc

```
index.html
css/style.css
js/data-hsk1.js    506 từ + câu mẫu theo bài
js/data-extra.js   pinyin, 214 bộ thủ, lượng từ, ngữ pháp, hội thoại
js/core.js         trạng thái, giọng nói, router, trang chủ
js/hoc.js          học từ vựng theo bài
js/modules.js      Mưa từ vựng, Luyện viết, Pinyin, Luyện nói
js/modules2.js     Thi thử, Bộ thủ, Hội thoại, Ngữ pháp
```

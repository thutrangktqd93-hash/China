# Hán Ngữ 3.0 Luyện Tập

Web tự học tiếng Trung cho người mới bắt đầu, theo danh sách từ **HSK 3.0 – GF0025-2021, cấp 1** (506 thẻ học). Đây là bộ dữ liệu tham chiếu theo GF0025-2021, không mặc định đồng nhất với đề cương thi HSK mới.

**Mở web:** https://thutrangktqd93-hash.github.io/China/

## Chuyên mục

| Mục | Nội dung |
|---|---|
| Trang chủ | Bảng điều khiển học tập: chọn điểm bắt đầu (chưa biết gì / đã biết pinyin), nút “Bắt đầu bài học tiếp theo”, việc cần làm hôm nay, tổng quan tiến độ, lộ trình 7 chặng nối các mô-đun sẵn có, điểm cần cải thiện (từ hay quên, thanh điệu, cặp âm, câu nghe sai, bài sai nhiều) |
| Học từ vựng | 506 từ chia 22 bài theo chủ đề, thẻ từ có pinyin tô màu thanh điệu, câu mẫu, flashcard ôn tập cách quãng (SRS: 4 mức Quên/Khó/Tốt/Rất dễ, hàng đợi từ quá hạn → đến hạn → từ mới, mặc định 10 từ mới/ngày), 3 game (Ghép cặp, Thử thách tốc độ, Bắt thanh điệu) và 3 bài luyện nghe |
| Mưa từ vựng | Nghĩa tiếng Việt hoặc âm thanh rơi xuống, gõ pinyin để bắn hạ; gõ số thanh điệu để nhân đôi điểm, có trùm cuối mỗi cấp và bám đuổi từ yếu |
| Luyện viết | Xem thứ tự nét và tự viết trên ô Mễ tự cách, báo nét sai (dùng thư viện Hanzi Writer) |
| Pinyin | Thanh điệu, 23 thanh mẫu, 36 vận mẫu có âm thanh; luyện nghe thanh điệu và cặp âm dễ nhầm |
| Luyện nói | Đọc to câu/từ: hiện câu trình duyệt nhận diện được, từ nào chưa nhận diện và *độ khớp nhận diện văn bản (tham khảo)*, không phải điểm phát âm. Luyện phát âm thanh 1–4, cặp âm dễ nhầm, biến điệu (thanh 3, 不, 一) bằng ghi âm tự nghe lại (không lưu, không gửi đi) |
| Hội thoại | 10 tình huống, nghe cả bài, đóng vai A/B có chấm điểm, luyện xếp câu |
| Ngữ pháp | 16 điểm ngữ pháp HSK 1, 20 lượng từ, bài tập điền từ và sắp xếp câu |
| Bộ thủ | 214 bộ thủ lọc theo số nét, ví dụ chữ HSK 1, trò chơi đoán nghĩa |
| Shadowing | Nghe từng câu rồi nói đuổi theo: nhại theo có ngắt chờ, lặp câu, nghe chay, chấm độ khớp |
| Kiểm tra tổng hợp cấp 1 – GF0025-2021 | Đề luyện tập nội bộ 40 câu nghe + đọc, 30 phút, chấm điểm và xem lại câu sai (không phải đề thi HSK chính thức) |
| Lịch sử | Lịch học, phút học, nhật ký, sao lưu/khôi phục, đồng bộ giữa máy tính và điện thoại (Firebase) |

## Ghi chú

- Âm thanh: thư viện audio tạo sẵn (MeloTTS, giấy phép MIT, giọng nữ phổ thông) cho toàn bộ 1.040 nội dung, giống nhau trên mọi thiết bị. Giọng của trình duyệt chỉ dùng khi một nội dung chưa có file.
- Nhận dạng giọng nói (luyện nói) dùng tính năng của trình duyệt; luyện nói cần Chrome/Edge (máy tính, Android) hoặc Safari (iPhone) và quyền dùng micro.
- Danh sách từ: HSK 3.0 – GF0025-2021, cấp 1. Ngày 25/11/2026 đã đối chiếu với bộ dữ liệu cộng đồng [complete-hsk-vocabulary](https://github.com/drkameleon/complete-hsk-vocabulary) (`wordlists/exclusive/new/1.json`, commit 7ac65bf, bản số hóa của bên thứ ba): 506/506 thẻ có trong danh sách, 0 trùng, 0 mục bổ sung. 25 từ ghi pinyin theo cách đọc thực tế (biến điệu 一/不, khinh thanh) khác cách ghi thanh gốc của bộ tham chiếu. Chi tiết trong `js/curriculum.js`.
- Nghĩa tiếng Việt, câu mẫu, hội thoại và bài kiểm tra tổng hợp được biên soạn để tự học, không phải tài liệu chính thức.
- Tiến độ học lưu trong trình duyệt của từng người.

## Cấu trúc

```
index.html
css/style.css
js/data-hsk1.js    506 từ + câu mẫu theo bài
js/data-extra.js   pinyin, 214 bộ thủ, lượng từ, ngữ pháp, hội thoại
js/core.js         trạng thái, giọng nói, router, trang chủ
js/curriculum.js   phiên bản chương trình, nguồn đối chiếu, metadata từ vựng
js/srs.js          ôn tập cách quãng: lịch ôn, hàng đợi, chuyển dữ liệu cũ
js/dashboard.js    trang chủ bảng điều khiển, lộ trình, ghi nhận lỗi và điểm yếu
js/speech.js       giọng nói dùng chung: phản hồi nhận diện, quyền micro, ghi âm tự nghe lại
js/audio.js        AudioService: phát thư viện audio tĩnh trong audio/, giọng trình duyệt chỉ là dự phòng
audio/            thư viện audio (giọng nữ MeloTTS, bản thường + bản chậm, AAC .m4a), tạo bằng tools/audio/build_audio.py
js/hoc.js          học từ vựng theo bài
js/modules.js      Mưa từ vựng, Luyện viết, Pinyin, Luyện nói
js/modules2.js     Kiểm tra tổng hợp, Bộ thủ, Hội thoại, Ngữ pháp
js/shadow.js       Shadowing
js/history.js      Lịch sử học, sao lưu và khôi phục
js/sync.js         Đồng bộ (Firebase)
```

/* HSK 3.0 cấp 1 — 506 từ (theo danh sách chuẩn GF0025-2021), chia 22 bài theo chủ đề.
   Các hư từ cốt lõi (是 不 吗 呢 很 也 好 的 · 这 那 什么 哪儿 有 没有 了 · 在 和 吧 太 都 怎么) được đặt ở bài 1–3
   để câu mẫu của mọi bài chỉ dùng từ của bài đó và các bài trước (kiểm tra: python3 tools/kiem-tra-cau-mau.py).
   Mỗi dòng từ: chữ|pinyin (cách âm tiết bằng dấu cách)|nghĩa tiếng Việt
   Mỗi dòng câu: các từ cách nhau bằng dấu cách|pinyin|nghĩa */
window.HSK1_RAW = [
["Đại từ & lời chào","你我他",`
我|wǒ|tôi
我们|wǒ men|chúng tôi, chúng ta
你|nǐ|bạn, anh, chị
你们|nǐ men|các bạn
您|nín|ngài, ông, bà (kính trọng)
他|tā|anh ấy, ông ấy
他们|tā men|họ, bọn họ
她|tā|cô ấy, bà ấy
她们|tā men|các cô ấy
们|men|(hậu tố số nhiều)
谁|shéi|ai
谢谢|xiè xie|cảm ơn
不客气|bú kè qi|đừng khách sáo
对不起|duì bu qǐ|xin lỗi
没关系|méi guān xi|không sao
再见|zài jiàn|tạm biệt
请|qǐng|mời, xin
请问|qǐng wèn|xin hỏi
请进|qǐng jìn|mời vào
请坐|qǐng zuò|mời ngồi
没什么|méi shén me|không có gì
没事儿|méi shìr|không sao đâu
是|shì|là
不|bù|không
吗|ma|không? (trợ từ hỏi)
呢|ne|còn…thì sao? (trợ từ)
很|hěn|rất
也|yě|cũng
好|hǎo|tốt, hay
的|de|của (trợ từ)`,`
谢谢 你！|xièxie nǐ!|Cảm ơn bạn!
对不起。 没关系。|duìbuqǐ. méiguānxi.|Xin lỗi. Không sao.
请问， 他 是 谁？|qǐngwèn, tā shì shéi?|Xin hỏi, anh ấy là ai?`],

["Số đếm & lượng từ","一二三",`
一|yī|một
二|èr|hai
三|sān|ba
四|sì|bốn
五|wǔ|năm
六|liù|sáu
七|qī|bảy
八|bā|tám
九|jiǔ|chín
十|shí|mười
零|líng|số không
百|bǎi|trăm
两|liǎng|hai (dùng khi đếm)
半|bàn|một nửa, rưỡi
一半|yí bàn|một nửa
几|jǐ|mấy
多少|duō shao|bao nhiêu
多|duō|nhiều
少|shǎo|ít
第|dì|thứ (số thứ tự)
第二|dì èr|thứ hai
个|gè|cái, chiếc (lượng từ chung)
口|kǒu|miệng; (lượng từ người trong nhà)
块|kuài|miếng; đồng (tệ)
次|cì|lần
岁|suì|tuổi
这|zhè|này, đây
那|nà|kia, đó
什么|shén me|cái gì
哪儿|nǎr|ở đâu
有|yǒu|có
没有|méi yǒu|không có; chưa
了|le|rồi (trợ từ)`,`
你 几 岁？|nǐ jǐ suì?|Bạn mấy tuổi?
这 个 多少 块？|zhè ge duōshao kuài?|Cái này bao nhiêu đồng?
这 是 第 一 次。|zhè shì dì yī cì.|Đây là lần đầu tiên.`],

["Gia đình","爸妈",`
爸|bà|bố
爸爸|bà ba|bố, ba
妈|mā|mẹ
妈妈|mā ma|mẹ, má
哥|gē|anh trai
哥哥|gē ge|anh trai
姐|jiě|chị gái
姐姐|jiě jie|chị gái
弟|dì|em trai
弟弟|dì di|em trai
妹|mèi|em gái
妹妹|mèi mei|em gái
爷爷|yé ye|ông nội
奶|nǎi|sữa; bà
奶奶|nǎi nai|bà nội
儿子|ér zi|con trai
女儿|nǚ ér|con gái
孩子|hái zi|con, đứa trẻ
子|zǐ|con
家人|jiā rén|người nhà
小孩儿|xiǎo háir|trẻ con
小朋友|xiǎo péng you|bạn nhỏ, em bé
在|zài|ở; đang
和|hé|và
吧|ba|nhé, chứ (trợ từ)
太|tài|quá
都|dōu|đều
怎么|zěn me|thế nào, sao`,`
这 是 我 爸爸 和 妈妈。|zhè shì wǒ bàba hé māma.|Đây là bố và mẹ tôi.
我 有 一 个 哥哥。|wǒ yǒu yí ge gēge.|Tôi có một anh trai.
她 的 女儿 两 岁。|tā de nǚ'ér liǎng suì.|Con gái cô ấy hai tuổi.`],

["Con người & nghề nghiệp","人",`
人|rén|người
男|nán|nam
女|nǚ|nữ
男人|nán rén|đàn ông
女人|nǚ rén|phụ nữ
男孩儿|nán háir|bé trai
女孩儿|nǚ háir|bé gái
男生|nán shēng|nam sinh, con trai
女生|nǚ shēng|nữ sinh, con gái
朋友|péng you|bạn bè
男朋友|nán péng you|bạn trai
女朋友|nǚ péng you|bạn gái
老人|lǎo rén|người già
老师|lǎo shī|giáo viên
学生|xué sheng|học sinh
同学|tóng xué|bạn học
医生|yī shēng|bác sĩ
工人|gōng rén|công nhân
先生|xiān sheng|ông, ngài; chồng
小姐|xiǎo jie|cô (nên dùng cẩn thận khi gọi người lạ)
病人|bìng rén|bệnh nhân
网友|wǎng yǒu|bạn trên mạng
别人|bié ren|người khác`,`
她 是 我 的 老师。|tā shì wǒ de lǎoshī.|Cô ấy là giáo viên của tôi.
我 爸爸 是 医生。|wǒ bàba shì yīshēng.|Bố tôi là bác sĩ.
他 是 我 的 好 朋友。|tā shì wǒ de hǎo péngyou.|Anh ấy là bạn tốt của tôi.`],

["Giờ giấc trong ngày","天",`
今天|jīn tiān|hôm nay
明天|míng tiān|ngày mai
昨天|zuó tiān|hôm qua
后天|hòu tiān|ngày kia
前天|qián tiān|hôm kia
天|tiān|ngày; trời
白天|bái tiān|ban ngày
早上|zǎo shang|buổi sáng sớm
上午|shàng wǔ|buổi sáng
中午|zhōng wǔ|buổi trưa
下午|xià wǔ|buổi chiều
晚上|wǎn shang|buổi tối
早|zǎo|sớm
晚|wǎn|muộn; tối
现在|xiàn zài|bây giờ
时候|shí hou|lúc, khi
时间|shí jiān|thời gian
小时|xiǎo shí|giờ, tiếng đồng hồ
点|diǎn|giờ; chấm
分|fēn|phút; chia
半天|bàn tiān|nửa ngày; mãi
一会儿|yí huìr|một lát`,`
现在 几 点？|xiànzài jǐ diǎn?|Bây giờ mấy giờ?
我 明天 上午 有 时间。|wǒ míngtiān shàngwǔ yǒu shíjiān.|Sáng mai tôi rảnh.
现在 是 下午 两 点 半。|xiànzài shì xiàwǔ liǎng diǎn bàn.|Bây giờ là hai giờ rưỡi chiều.`],

["Năm, tháng, tuần","年月",`
年|nián|năm
今年|jīn nián|năm nay
明年|míng nián|năm sau
去年|qù nián|năm ngoái
半年|bàn nián|nửa năm
新年|xīn nián|năm mới
月|yuè|tháng; mặt trăng
日|rì|ngày
号|hào|ngày (trong tháng); số
日期|rì qī|ngày tháng
星期|xīng qī|tuần; thứ
星期日|xīng qī rì|chủ nhật
星期天|xīng qī tiān|chủ nhật
生日|shēng rì|sinh nhật
有时|yǒu shí|có lúc
有时候|yǒu shí hou|có khi, đôi khi
上次|shàng cì|lần trước
下次|xià cì|lần sau
先|xiān|trước
最后|zuì hòu|cuối cùng
马上|mǎ shàng|ngay lập tức`,`
今天 几 月 几 号？|jīntiān jǐ yuè jǐ hào?|Hôm nay ngày mấy tháng mấy?
明天 是 我 的 生日。|míngtiān shì wǒ de shēngrì.|Ngày mai là sinh nhật tôi.
今天 星期 几？|jīntiān xīngqī jǐ?|Hôm nay thứ mấy?`],

["Ăn uống","吃喝",`
吃|chī|ăn
吃饭|chī fàn|ăn cơm
饭|fàn|cơm, bữa ăn
米饭|mǐ fàn|cơm
早饭|zǎo fàn|bữa sáng
午饭|wǔ fàn|bữa trưa
晚饭|wǎn fàn|bữa tối
菜|cài|món ăn; rau
肉|ròu|thịt
鸡蛋|jī dàn|trứng gà
面包|miàn bāo|bánh mì
面条儿|miàn tiáor|mì sợi
包子|bāo zi|bánh bao
水果|shuǐ guǒ|hoa quả
喝|hē|uống
水|shuǐ|nước
茶|chá|trà
牛奶|niú nǎi|sữa bò
杯|bēi|cốc, ly
杯子|bēi zi|cái cốc
好吃|hǎo chī|ngon
饿|è|đói
渴|kě|khát`,`
你 吃 什么？|nǐ chī shénme?|Bạn ăn gì?
一 杯 茶， 谢谢。|yì bēi chá, xièxie.|Cho tôi một cốc trà, cảm ơn.
这 个 菜 很 好吃。|zhè ge cài hěn hǎochī.|Món này rất ngon.`],

["Ở trường","学校",`
学|xué|học
学习|xué xí|học tập
学校|xué xiào|trường học
学院|xué yuàn|học viện
小学|xiǎo xué|tiểu học
中学|zhōng xué|trung học
大学|dà xué|đại học
小学生|xiǎo xué shēng|học sinh tiểu học
中学生|zhōng xué shēng|học sinh trung học
大学生|dà xué shēng|sinh viên
上学|shàng xué|đi học
放学|fàng xué|tan học
上课|shàng kè|vào học
下课|xià kè|tan lớp
课|kè|bài học, tiết học
课本|kè běn|sách giáo khoa
课文|kè wén|bài khóa
考|kǎo|thi
考试|kǎo shì|kỳ thi; thi
教|jiāo|dạy
教学楼|jiào xué lóu|tòa nhà dạy học
班|bān|lớp
书|shū|sách
书包|shū bāo|cặp sách
本|běn|quyển (lượng từ)
本子|běn zi|quyển vở
读书|dú shū|đọc sách, đi học
听写|tīng xiě|chính tả, nghe viết
页|yè|trang`,`
我 是 大学生。|wǒ shì dàxuéshēng.|Tôi là sinh viên.
我们 八 点 上课。|wǒmen bā diǎn shàngkè.|Chúng tôi vào học lúc tám giờ.
明天 有 考试。|míngtiān yǒu kǎoshì.|Ngày mai có bài thi.`],

["Ngôn ngữ & ghi nhớ","说写",`
汉语|Hàn yǔ|tiếng Hán
汉字|hàn zì|chữ Hán
中文|Zhōng wén|tiếng Trung
外语|wài yǔ|ngoại ngữ
字|zì|chữ
写|xiě|viết
读|dú|đọc
话|huà|lời nói
说|shuō|nói
说话|shuō huà|nói chuyện
问|wèn|hỏi
回答|huí dá|trả lời
知识|zhī shi|kiến thức
明白|míng bai|hiểu, rõ ràng
记|jì|ghi, nhớ
记得|jì de|nhớ
记住|jì zhù|nhớ kỹ
忘|wàng|quên
忘记|wàng jì|quên
认真|rèn zhēn|chăm chỉ, nghiêm túc
试|shì|thử`,`
你 说 汉语 吗？|nǐ shuō Hànyǔ ma?|Bạn có nói tiếng Hán không?
这 个 字 怎么 写？|zhè ge zì zěnme xiě?|Chữ này viết thế nào?
我 明白 了。|wǒ míngbai le.|Tôi hiểu rồi.`],

["Nhà cửa & đồ dùng","家",`
家|jiā|nhà, gia đình
家里|jiā lǐ|trong nhà
住|zhù|sống, ở
在家|zài jiā|ở nhà
房子|fáng zi|ngôi nhà
房间|fáng jiān|phòng
门|mén|cửa
门口|mén kǒu|cửa ra vào
床|chuáng|giường
桌子|zhuō zi|cái bàn
东西|dōng xi|đồ vật
衣服|yī fu|quần áo
穿|chuān|mặc
洗|xǐ|rửa, giặt
洗手间|xǐ shǒu jiān|nhà vệ sinh
楼|lóu|tòa nhà, tầng
楼上|lóu shàng|trên lầu
楼下|lóu xià|dưới lầu
间|jiān|gian (lượng từ phòng)
钱|qián|tiền
钱包|qián bāo|ví tiền
手机|shǒu jī|điện thoại di động
电话|diàn huà|điện thoại
打电话|dǎ diàn huà|gọi điện thoại
电|diàn|điện
电脑|diàn nǎo|máy tính
电视|diàn shì|ti vi
电视机|diàn shì jī|máy ti vi`,`
我 的 房间 在 楼上。|wǒ de fángjiān zài lóushàng.|Phòng tôi ở trên lầu.
洗手间 在 哪儿？|xǐshǒujiān zài nǎr?|Nhà vệ sinh ở đâu?
妈妈 在 打电话。|māma zài dǎ diànhuà.|Mẹ đang gọi điện thoại.`],

["Phương hướng & vị trí","上下",`
上|shàng|trên; lên
下|xià|dưới; xuống
前|qián|trước
后|hòu|sau
里|lǐ|trong
外|wài|ngoài
中|zhōng|giữa
中间|zhōng jiān|ở giữa
旁边|páng biān|bên cạnh
上边|shàng bian|phía trên
下边|xià bian|phía dưới
前边|qián bian|phía trước
后边|hòu bian|phía sau
里边|lǐ bian|bên trong
外边|wài bian|bên ngoài
左|zuǒ|trái
左边|zuǒ bian|bên trái
右|yòu|phải
右边|yòu bian|bên phải
东|dōng|đông
东边|dōng bian|phía đông
西|xī|tây
西边|xī bian|phía tây
南|nán|nam
南边|nán bian|phía nam
北|běi|bắc
北边|běi bian|phía bắc
这边|zhè bian|bên này
那边|nà bian|bên kia
一边|yì biān|một bên; vừa…vừa`,`
书 在 桌子 上边。|shū zài zhuōzi shàngbian.|Sách ở trên bàn.
我 家 在 学校 旁边。|wǒ jiā zài xuéxiào pángbiān.|Nhà tôi ở cạnh trường học.
洗手间 在 左边。|xǐshǒujiān zài zuǒbian.|Nhà vệ sinh ở bên trái.`],

["Đi lại","去来",`
去|qù|đi
来|lái|đến
来到|lái dào|đến nơi
到|dào|đến
回|huí|về
回到|huí dào|trở về
回家|huí jiā|về nhà
回来|huí lai|quay về
回去|huí qu|về, quay về (nơi khác)
走|zǒu|đi bộ; rời đi
走路|zǒu lù|đi bộ
跑|pǎo|chạy
进|jìn|vào
进来|jìn lai|đi vào (về phía người nói)
进去|jìn qu|đi vào (xa người nói)
出|chū|ra
出来|chū lai|đi ra
出去|chū qu|ra ngoài
起来|qǐ lai|đứng dậy
坐|zuò|ngồi; đi (xe)
坐下|zuò xia|ngồi xuống
站|zhàn|đứng; trạm`,`
你 去 哪儿？|nǐ qù nǎr?|Bạn đi đâu?
我 走路 去 学校。|wǒ zǒulù qù xuéxiào.|Tôi đi bộ đến trường.
请 进来 坐 吧。|qǐng jìnlai zuò ba.|Mời vào ngồi nhé.`],

["Xe cộ & địa điểm","车",`
车|chē|xe
汽车|qì chē|ô tô
火车|huǒ chē|tàu hỏa
飞机|fēi jī|máy bay
飞|fēi|bay
打车|dǎ chē|bắt taxi
开车|kāi chē|lái xe
上车|shàng chē|lên xe
下车|xià chē|xuống xe
车上|chē shang|trên xe
车站|chē zhàn|bến xe, nhà ga
车票|chē piào|vé xe
机场|jī chǎng|sân bay
机票|jī piào|vé máy bay
票|piào|vé
门票|mén piào|vé vào cửa
路|lù|đường
马路|mǎ lù|đường phố
路口|lù kǒu|ngã tư, giao lộ
路上|lù shang|trên đường
远|yuǎn|xa
地方|dì fang|nơi, chỗ
地点|dì diǎn|địa điểm
地图|dì tú|bản đồ
北京|Běi jīng|Bắc Kinh
中国|Zhōng guó|Trung Quốc
国|guó|nước, quốc gia
国家|guó jiā|đất nước
国外|guó wài|ở nước ngoài
外国|wài guó|nước ngoài (người, vật nước ngoài)`,`
我 坐 飞机 去 北京。|wǒ zuò fēijī qù Běijīng.|Tôi đi máy bay đến Bắc Kinh.
机场 很 远。|jīchǎng hěn yuǎn.|Sân bay rất xa.
我们 在 路口 下车。|wǒmen zài lùkǒu xiàchē.|Chúng tôi xuống xe ở ngã tư.`],

["Mua sắm & nơi chốn","买",`
买|mǎi|mua
贵|guì|đắt
元|yuán|đồng (nhân dân tệ)
毛|máo|hào (0,1 tệ)
商场|shāng chǎng|trung tâm thương mại
商店|shāng diàn|cửa hàng
书店|shū diàn|hiệu sách
饭店|fàn diàn|nhà hàng, khách sạn
医院|yī yuàn|bệnh viện
图书馆|tú shū guǎn|thư viện
电影院|diàn yǐng yuàn|rạp chiếu phim
地上|dì shang|trên mặt đất
花|huā|hoa; tiêu (tiền)
拿|ná|cầm, lấy
送|sòng|tặng; tiễn
给|gěi|cho, đưa
用|yòng|dùng
有用|yǒu yòng|có ích
找|zhǎo|tìm
找到|zhǎo dào|tìm thấy
包|bāo|túi, gói`,`
我 去 商店 买 东西。|wǒ qù shāngdiàn mǎi dōngxi.|Tôi đến cửa hàng mua đồ.
这 个 太 贵 了。|zhè ge tài guì le.|Cái này đắt quá.
我 找到 我 的 钱包 了。|wǒ zhǎodào wǒ de qiánbāo le.|Tôi tìm thấy ví của tôi rồi.`],

["Sở thích & giải trí","玩",`
爱|ài|yêu
爱好|ài hào|sở thích
喜欢|xǐ huan|thích
电影|diàn yǐng|phim
球|qiú|quả bóng
打球|dǎ qiú|chơi bóng
打|dǎ|đánh, chơi
唱|chàng|hát
唱歌|chàng gē|hát
歌|gē|bài hát
玩儿|wánr|chơi
好玩儿|hǎo wánr|vui, thú vị
上网|shàng wǎng|lên mạng
网上|wǎng shang|trên mạng
开玩笑|kāi wán xiào|nói đùa
好看|hǎo kàn|đẹp, hay (xem)
好听|hǎo tīng|hay (nghe)
笑|xiào|cười
休息|xiū xi|nghỉ ngơi
放假|fàng jià|nghỉ lễ
睡|shuì|ngủ
睡觉|shuì jiào|đi ngủ`,`
我 喜欢 唱歌。|wǒ xǐhuan chànggē.|Tôi thích hát.
你 的 爱好 是 什么？|nǐ de àihào shì shénme?|Sở thích của bạn là gì?
他 唱歌 很 好听。|tā chànggē hěn hǎotīng.|Anh ấy hát rất hay.`],

["Việc hằng ngày","做",`
起|qǐ|dậy
起床|qǐ chuáng|thức dậy
上班|shàng bān|đi làm
下班|xià bān|tan làm
工作|gōng zuò|làm việc; công việc
开会|kāi huì|họp
请假|qǐng jià|xin nghỉ
做|zuò|làm
干|gàn|làm
干什么|gàn shén me|làm gì
事|shì|việc
打开|dǎ kāi|mở ra
开|kāi|mở; lái
关|guān|đóng; tắt
关上|guān shang|đóng lại
放|fàng|đặt, để
帮|bāng|giúp
帮忙|bāng máng|giúp đỡ
准备|zhǔn bèi|chuẩn bị
等|děng|đợi
动|dòng|động, cử động
动作|dòng zuò|động tác`,`
我 早上 七 点 起床。|wǒ zǎoshang qī diǎn qǐchuáng.|Buổi sáng tôi dậy lúc bảy giờ.
你 在 干什么？|nǐ zài gàn shénme?|Bạn đang làm gì?
请 帮 我 开 门。|qǐng bāng wǒ kāi mén.|Làm ơn mở cửa giúp tôi.`],

["Nhìn, nghe, nghĩ","看听",`
看|kàn|xem, nhìn
看见|kàn jiàn|nhìn thấy
看到|kàn dào|thấy
看病|kàn bìng|khám bệnh
听|tīng|nghe
听到|tīng dào|nghe thấy
听见|tīng jiàn|nghe thấy
想|xiǎng|muốn; nghĩ; nhớ
觉得|jué de|cảm thấy
知道|zhī dào|biết
认识|rèn shi|quen biết
见|jiàn|gặp
见面|jiàn miàn|gặp mặt
叫|jiào|gọi; tên là
名字|míng zi|tên
介绍|jiè shào|giới thiệu
告诉|gào su|nói cho biết
得到|dé dào|nhận được
会|huì|biết (làm); sẽ
能|néng|có thể
要|yào|muốn; cần; sẽ`,`
你 叫 什么 名字？|nǐ jiào shénme míngzi?|Bạn tên là gì?
你 认识 他 吗？|nǐ rènshi tā ma?|Bạn có quen anh ấy không?
我 不 知道。|wǒ bù zhīdào.|Tôi không biết.`],

["Tính chất & đánh giá","大小",`
大|dà|to, lớn
小|xiǎo|nhỏ
高|gāo|cao
坏|huài|xấu, hỏng
新|xīn|mới
老|lǎo|già, cũ
快|kuài|nhanh
慢|màn|chậm
冷|lěng|lạnh
热|rè|nóng
忙|máng|bận
累|lèi|mệt
难|nán|khó
干净|gān jìng|sạch sẽ
白|bái|trắng
真|zhēn|thật
有名|yǒu míng|nổi tiếng
重要|zhòng yào|quan trọng
一样|yí yàng|giống nhau
对|duì|đúng; đối với
不对|bú duì|không đúng
错|cuò|sai
差|chà|kém
行|xíng|được, ổn
重|zhòng|nặng`,`
今天 很 冷。|jīntiān hěn lěng.|Hôm nay rất lạnh.
你 说 的 对。|nǐ shuō de duì.|Bạn nói đúng.
汉语 不 太 难。|Hànyǔ bú tài nán.|Tiếng Hán không khó lắm.`],

["Sức khỏe, cảm xúc, thời tiết","天气",`
病|bìng|bệnh
生病|shēng bìng|bị ốm
身体|shēn tǐ|cơ thể, sức khỏe
身上|shēn shang|trên người
手|shǒu|tay
高兴|gāo xìng|vui mừng
生气|shēng qì|tức giận
天气|tiān qì|thời tiết
风|fēng|gió
雨|yǔ|mưa
下雨|xià yǔ|trời mưa
树|shù|cây
山|shān|núi`,`
你 身体 好 吗？|nǐ shēntǐ hǎo ma?|Bạn có khỏe không?
今天 天气 很 好。|jīntiān tiānqì hěn hǎo.|Hôm nay thời tiết rất đẹp.
明天 会 下雨。|míngtiān huì xiàyǔ.|Ngày mai sẽ mưa.`],

["Phó từ thường dùng","很",`
没|méi|không, chưa
不大|bú dà|không lắm
不用|bú yòng|không cần
非常|fēi cháng|vô cùng
最|zuì|nhất
最好|zuì hǎo|tốt nhất là
还|hái|còn, vẫn
还是|hái shi|hay là; vẫn
还有|hái yǒu|còn có
再|zài|lại, nữa
就|jiù|thì, liền
常|cháng|thường
常常|cháng cháng|thường xuyên
真的|zhēn de|thật sự
正|zhèng|đang
正在|zhèng zài|đang
一起|yì qǐ|cùng nhau
一块儿|yí kuàir|cùng nhau
一点儿|yì diǎnr|một chút
一下儿|yí xiàr|một chút, thử
一些|yì xiē|một số
有些|yǒu xiē|có một số
有一些|yǒu yì xiē|có một vài
有的|yǒu de|có cái, có người`,`
我们 都 是 学生。|wǒmen dōu shì xuésheng.|Chúng tôi đều là học sinh.
我 也 很 忙。|wǒ yě hěn máng.|Tôi cũng rất bận.
我们 一起 去 吧。|wǒmen yìqǐ qù ba.|Chúng ta cùng đi nhé.`],

["Hỏi & chỉ định","什么",`
哪|nǎ|nào
哪里|nǎ lǐ|ở đâu
哪些|nǎ xiē|những cái nào
这儿|zhèr|ở đây
这里|zhè lǐ|ở đây
这些|zhè xiē|những cái này
那儿|nàr|ở đó
那里|nà lǐ|ở đó
那些|nà xiē|những cái kia
是不是|shì bu shì|có phải không`,`
这 是 什么？|zhè shì shénme?|Đây là cái gì?
你 家 在 哪儿？|nǐ jiā zài nǎr?|Nhà bạn ở đâu?
你 是 不 是 老师？|nǐ shì bu shì lǎoshī?|Bạn có phải là giáo viên không?`],

["Trợ từ & giới từ","的了",`
地|de|một cách (trợ từ)
着|zhe|đang (trợ từ tiếp diễn)
过|guò|đã từng; đi qua
跟|gēn|với, cùng
从|cóng|từ
比|bǐ|so với
别|bié|đừng
别的|bié de|cái khác`,`
你 好 吗？ 我 很 好， 你 呢？|nǐ hǎo ma? wǒ hěn hǎo, nǐ ne?|Bạn khỏe không? Tôi khỏe, còn bạn?
我 去 过 中国。|wǒ qù guo Zhōngguó.|Tôi đã từng đến Trung Quốc.
我 跟 朋友 一起 吃饭。|wǒ gēn péngyou yìqǐ chīfàn.|Tôi ăn cơm cùng bạn.`]
];

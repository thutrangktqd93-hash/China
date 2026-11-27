/* HSK 3.0 cấp 1 — 506 từ (theo danh sách chuẩn GF0025-2021), chia 22 bài theo chủ đề.
   Các hư từ cốt lõi (是 不 吗 呢 很 也 好 的 · 这 那 什么 哪儿 有 没有 了 · 在 和 吧 太 都 怎么) được đặt ở bài 1–3
   để câu mẫu của mọi bài chỉ dùng từ của bài đó và các bài trước (kiểm tra: python3 tools/kiem-tra-cau-mau.py).
   Mỗi dòng từ: chữ|pinyin (cách âm tiết bằng dấu cách)|nghĩa tiếng Việt
   Mỗi từ đều có ít nhất một câu ví dụ; câu nằm ở bài của từ học muộn nhất trong câu.
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
请问， 他 是 谁？|qǐngwèn, tā shì shéi?|Xin hỏi, anh ấy là ai?
你 好！|nǐ hǎo!|Xin chào!
您 好！|nín hǎo!|Chào ông/bà!
你们 好！|nǐmen hǎo!|Chào các bạn!
你 好 吗？|nǐ hǎo ma?|Bạn khỏe không?
我 很 好， 你 呢？|wǒ hěn hǎo, nǐ ne?|Tôi rất khỏe, còn bạn?
我 也 很 好。|wǒ yě hěn hǎo.|Tôi cũng rất khỏe.
请进！ 请坐！|qǐngjìn! qǐngzuò!|Mời vào! Mời ngồi!
谢谢 你们！ 没什么。|xièxie nǐmen! méishénme.|Cảm ơn các bạn! – Có gì đâu.
对不起！ 没事儿。|duìbuqǐ! méishìr.|Xin lỗi! – Không sao đâu.`],

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
这 是 第 一 次。|zhè shì dì yī cì.|Đây là lần đầu tiên.
一 二 三 四 五 六 七 八 九 十。|yī èr sān sì wǔ liù qī bā jiǔ shí.|Một, hai, ba, bốn, năm, sáu, bảy, tám, chín, mười.
你 几 岁？ 我 十 岁。|nǐ jǐ suì? wǒ shí suì.|Em mấy tuổi? – Em mười tuổi.
他 二 十 岁。|tā èr shí suì.|Anh ấy hai mươi tuổi.
那 是 什么？|nà shì shénme?|Kia là cái gì?
你 有 什么？|nǐ yǒu shénme?|Bạn có gì?
我 有 两 个。|wǒ yǒu liǎng ge.|Tôi có hai cái.
这 个 好， 那 个 不 好。|zhè ge hǎo, nà ge bù hǎo.|Cái này tốt, cái kia không tốt.
他 有 很 多。|tā yǒu hěn duō.|Anh ấy có rất nhiều.
这 是 第二 次。|zhè shì dì'èr cì.|Đây là lần thứ hai.
我 有 一半。|wǒ yǒu yíbàn.|Tôi có một nửa.
这 是 你 的 吗？|zhè shì nǐ de ma?|Cái này là của bạn à?
不 多， 很 少。|bù duō, hěn shǎo.|Không nhiều, rất ít.`],

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
她 的 女儿 两 岁。|tā de nǚ'ér liǎng suì.|Con gái cô ấy hai tuổi.
这 是 我 爸爸， 那 是 我 妈妈。|zhè shì wǒ bàba, nà shì wǒ māma.|Đây là bố tôi, kia là mẹ tôi.
你 爸爸 妈妈 好 吗？|nǐ bàba māma hǎo ma?|Bố mẹ bạn khỏe không?
我 有 一 个 哥哥 和 一 个 姐姐。|wǒ yǒu yí ge gēge hé yí ge jiějie.|Tôi có một anh trai và một chị gái.
我 没有 弟弟， 也 没有 妹妹。|wǒ méiyǒu dìdi, yě méiyǒu mèimei.|Tôi không có em trai, cũng không có em gái.
爷爷 和 奶奶 都 很 好。|yéye hé nǎinai dōu hěn hǎo.|Ông và bà đều khỏe.
他们 有 两 个 孩子， 一 个 儿子， 一 个 女儿。|tāmen yǒu liǎng ge háizi, yí ge érzi, yí ge nǚ'ér.|Họ có hai con, một con trai, một con gái.
小朋友， 你 几 岁？|xiǎopéngyou, nǐ jǐ suì?|Em bé ơi, em mấy tuổi?
你 爸爸 在 哪儿？|nǐ bàba zài nǎr?|Bố bạn ở đâu?
我们 都 很 好。|wǒmen dōu hěn hǎo.|Chúng tôi đều khỏe.
你 怎么 了？|nǐ zěnme le?|Bạn sao thế?
是 你 哥哥 吧？|shì nǐ gēge ba?|Là anh trai bạn phải không?
我 和 妹妹 都 在。|wǒ hé mèimei dōu zài.|Tôi và em gái đều ở đây.`],

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
他 是 我 的 好 朋友。|tā shì wǒ de hǎo péngyou.|Anh ấy là bạn tốt của tôi.
老师 好！|lǎoshī hǎo!|Em chào thầy/cô!
我 是 学生。|wǒ shì xuésheng.|Tôi là học sinh.
你 是 老师 吗？|nǐ shì lǎoshī ma?|Bạn là giáo viên à?
他 不 是 老师， 他 是 学生。|tā bú shì lǎoshī, tā shì xuésheng.|Anh ấy không phải giáo viên, anh ấy là học sinh.
她 是 老师。|tā shì lǎoshī.|Cô ấy là giáo viên.
我们 是 学生。|wǒmen shì xuésheng.|Chúng tôi là học sinh.
他们 也 是 学生 吗？|tāmen yě shì xuésheng ma?|Họ cũng là học sinh à?
她们 不 是 老师。|tāmen bú shì lǎoshī.|Các cô ấy không phải giáo viên.
谢谢 老师！ 不客气。|xièxie lǎoshī! búkèqi.|Cảm ơn thầy! – Không có gì.
老师， 再见！|lǎoshī, zàijiàn!|Tạm biệt thầy!
请问， 您 是 老师 吗？|qǐngwèn, nín shì lǎoshī ma?|Xin hỏi, ông là giáo viên phải không?
他 是 我 的 朋友。|tā shì wǒ de péngyou.|Anh ấy là bạn của tôi.
这 是 我 的 同学。|zhè shì wǒ de tóngxué.|Đây là bạn học của tôi.
那 是 谁？ 那 是 我们 的 老师。|nà shì shéi? nà shì wǒmen de lǎoshī.|Kia là ai? Đó là giáo viên của chúng tôi.
老师 有 两 个 学生。|lǎoshī yǒu liǎng ge xuésheng.|Giáo viên có hai học sinh.
我们 有 三 百 个 学生。|wǒmen yǒu sān bǎi ge xuésheng.|Chúng tôi có ba trăm học sinh.
我们 有 一 百 零 八 个 学生。|wǒmen yǒu yì bǎi líng bā ge xuésheng.|Chúng tôi có một trăm lẻ tám học sinh.
他 的 朋友 很 多。|tā de péngyou hěn duō.|Bạn bè của anh ấy rất nhiều.
我 的 家人 都 是 老师。|wǒ de jiārén dōu shì lǎoshī.|Người nhà tôi đều là giáo viên.
我 爸爸 是 医生， 我 妈妈 是 工人。|wǒ bàba shì yīshēng, wǒ māma shì gōngrén.|Bố tôi là bác sĩ, mẹ tôi là công nhân.
先生， 请坐！|xiānsheng, qǐngzuò!|Mời ông ngồi!
那 个 男孩儿 是 谁？ 那 个 女孩儿 呢？|nà ge nánháir shì shéi? nà ge nǚháir ne?|Cậu bé kia là ai? Còn cô bé kia?
她 是 我 的 女朋友。|tā shì wǒ de nǚpéngyou.|Cô ấy là bạn gái của tôi.
她 有 男朋友 吗？|tā yǒu nánpéngyou ma?|Cô ấy có bạn trai không?
他 是 我 的 网友。|tā shì wǒ de wǎngyǒu.|Anh ấy là bạn trên mạng của tôi.
这 是 别人 的， 不 是 我 的。|zhè shì biéren de, bú shì wǒ de.|Cái này là của người khác, không phải của tôi.
你 的 老师 是 男 的 吗？ 不， 是 女 的。|nǐ de lǎoshī shì nán de ma? bù, shì nǚ de.|Giáo viên của bạn là nam à? – Không, là nữ.`],

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
现在 是 下午 两 点 半。|xiànzài shì xiàwǔ liǎng diǎn bàn.|Bây giờ là hai giờ rưỡi chiều.
现在 八 点 半。|xiànzài bā diǎn bàn.|Bây giờ là tám giờ rưỡi.
现在 是 下午 三 点 十 分。|xiànzài shì xiàwǔ sān diǎn shí fēn.|Bây giờ là ba giờ mười phút chiều.
早上 好！|zǎoshang hǎo!|Chào buổi sáng!
你 早！|nǐ zǎo!|Chào bạn (buổi sáng)!
中午 你 在 哪儿？|zhōngwǔ nǐ zài nǎr?|Buổi trưa bạn ở đâu?
你 有 时间 吗？|nǐ yǒu shíjiān ma?|Bạn có thời gian không?
我 有 两 个 小时。|wǒ yǒu liǎng ge xiǎoshí.|Tôi có hai tiếng.
一 天 有 二 十 四 个 小时。|yì tiān yǒu èr shí sì ge xiǎoshí.|Một ngày có hai mươi bốn tiếng.`],

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
今天 星期 几？|jīntiān xīngqī jǐ?|Hôm nay thứ mấy?
今天 五 月 八 号。|jīntiān wǔ yuè bā hào.|Hôm nay là ngày 8 tháng 5.
今天 星期天， 明天 星期 一。|jīntiān xīngqītiān, míngtiān xīngqī yī.|Hôm nay chủ nhật, mai là thứ hai.
新年 好！|xīnnián hǎo!|Chúc mừng năm mới!
一 年 有 十 二 个 月。|yì nián yǒu shí èr ge yuè.|Một năm có mười hai tháng.
今天 的 日期 是 几 号？|jīntiān de rìqī shì jǐ hào?|Hôm nay là ngày bao nhiêu?
今天 是 我 的 生日。|jīntiān shì wǒ de shēngrì.|Hôm nay là sinh nhật tôi.
我 今年 十 岁 了。|wǒ jīnnián shí suì le.|Năm nay tôi mười tuổi rồi.`],

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
这 个 菜 很 好吃。|zhè ge cài hěn hǎochī.|Món này rất ngon.
你 喝 什么？ 我 喝 水。|nǐ hē shénme? wǒ hē shuǐ.|Bạn uống gì? – Tôi uống nước.
你 渴 吗？ 我 很 渴。|nǐ kě ma? wǒ hěn kě.|Bạn khát không? – Tôi rất khát.
早饭 我 吃 了 两 个 包子 和 一 个 鸡蛋。|zǎofàn wǒ chī le liǎng ge bāozi hé yí ge jīdàn.|Bữa sáng tôi ăn hai cái bánh bao và một quả trứng.
午饭 你 吃 什么？ 我 吃 面条儿。|wǔfàn nǐ chī shénme? wǒ chī miàntiáor.|Bữa trưa bạn ăn gì? – Tôi ăn mì.
我 不 吃 肉。|wǒ bù chī ròu.|Tôi không ăn thịt.
早上 我 喝 牛奶， 吃 面包。|zǎoshang wǒ hē niúnǎi, chī miànbāo.|Buổi sáng tôi uống sữa, ăn bánh mì.
这 是 谁 的 杯子？|zhè shì shéi de bēizi?|Đây là cốc của ai?
你 吃 饭 了 吗？|nǐ chī fàn le ma?|Bạn ăn cơm chưa?
我 吃 了 一半。|wǒ chī le yíbàn.|Tôi đã ăn một nửa.`],

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
明天 有 考试。|míngtiān yǒu kǎoshì.|Ngày mai có bài thi.
你 在 哪儿 学习？|nǐ zài nǎr xuéxí?|Bạn học ở đâu?
我 妹妹 是 小学生， 我 弟弟 是 中学生。|wǒ mèimei shì xiǎoxuéshēng, wǒ dìdi shì zhōngxuéshēng.|Em gái tôi là học sinh tiểu học, em trai tôi là học sinh trung học.
你 几 点 上学？|nǐ jǐ diǎn shàngxué?|Mấy giờ bạn đi học?
下午 四 点 放学。|xiàwǔ sì diǎn fàngxué.|Bốn giờ chiều tan học.
下课 了！|xiàkè le!|Hết giờ học rồi!
我们 班 有 二 十 个 学生。|wǒmen bān yǒu èr shí ge xuésheng.|Lớp chúng tôi có hai mươi học sinh.
我 有 三 本 书。|wǒ yǒu sān běn shū.|Tôi có ba quyển sách.
今天 的 课 很 好。|jīntiān de kè hěn hǎo.|Bài học hôm nay rất hay.
这 是 第 五 课 的 课文。|zhè shì dì wǔ kè de kèwén.|Đây là bài khóa của bài 5.
他 在 读书。|tā zài dúshū.|Anh ấy đang đọc sách.
课文 在 第 十 页。|kèwén zài dì shí yè.|Bài khóa ở trang 10.
今天 我们 听写。|jīntiān wǒmen tīngxiě.|Hôm nay chúng ta nghe viết chính tả.`],

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
我 明白 了。|wǒ míngbai le.|Tôi hiểu rồi.
你 先 说。|nǐ xiān shuō.|Bạn nói trước đi.
这 个 怎么 说？|zhè ge zěnme shuō?|Cái này nói thế nào?
他 在 中学 教 汉语。|tā zài zhōngxué jiāo Hànyǔ.|Anh ấy dạy tiếng Hán ở trường trung học.
这 是 我 的 汉语 书。|zhè shì wǒ de Hànyǔ shū.|Đây là sách tiếng Hán của tôi.
这 个 汉字 怎么 读？|zhè ge hànzì zěnme dú?|Chữ Hán này đọc thế nào?
你 说 的 话 我 明白 了。|nǐ shuō de huà wǒ míngbai le.|Lời bạn nói tôi đã hiểu rồi.
老师 问， 学生 回答。|lǎoshī wèn, xuésheng huídá.|Giáo viên hỏi, học sinh trả lời.
你 记得 我 吗？|nǐ jìde wǒ ma?|Bạn còn nhớ tôi không?
我 记住 了！|wǒ jìzhù le!|Tôi nhớ kỹ rồi!
他 学习 很 认真。|tā xuéxí hěn rènzhēn.|Anh ấy học rất chăm chỉ.
明天 考 汉语。|míngtiān kǎo Hànyǔ.|Ngày mai thi tiếng Hán.`],

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
妈妈 在 打电话。|māma zài dǎ diànhuà.|Mẹ đang gọi điện thoại.
你 家 有 几 口 人？|nǐ jiā yǒu jǐ kǒu rén?|Nhà bạn có mấy người?
我 家 有 四 口 人。|wǒ jiā yǒu sì kǒu rén.|Nhà tôi có bốn người.
昨天 我 在 家。|zuótiān wǒ zài jiā.|Hôm qua tôi ở nhà.
前天 我 不 在 家。|qiántiān wǒ bú zài jiā.|Hôm kia tôi không ở nhà.
晚饭 我 在 家 吃。|wǎnfàn wǒ zài jiā chī.|Bữa tối tôi ăn ở nhà.
这 个 多少 钱？|zhè ge duōshao qián?|Cái này bao nhiêu tiền?
十 块 钱。|shí kuài qián.|Mười đồng.
你 住 在 哪儿？|nǐ zhù zài nǎr?|Bạn sống ở đâu?
爸爸 在 楼下。|bàba zài lóuxià.|Bố ở dưới lầu.
他 今天 在家 吗？|tā jīntiān zàijiā ma?|Hôm nay anh ấy có ở nhà không?
家里 有 人 吗？|jiālǐ yǒu rén ma?|Trong nhà có ai không?
我 家 在 三 楼。|wǒ jiā zài sān lóu.|Nhà tôi ở tầng ba.
门口 有 一 个 人。|ménkǒu yǒu yí ge rén.|Ở cửa có một người.
你 的 手机 号 是 多少？|nǐ de shǒujī hào shì duōshao?|Số điện thoại của bạn là bao nhiêu?
我 家 有 两 个 电视。|wǒ jiā yǒu liǎng ge diànshì.|Nhà tôi có hai cái ti vi.
我 的 钱包 呢？|wǒ de qiánbāo ne?|Ví của tôi đâu?
没有 电 了。|méiyǒu diàn le.|Mất điện rồi.
有时候 我 在 家 吃 晚饭。|yǒushíhou wǒ zài jiā chī wǎnfàn.|Có khi tôi ăn tối ở nhà.`],

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
洗手间 在 左边。|xǐshǒujiān zài zuǒbian.|Nhà vệ sinh ở bên trái.
杯子 在 那边。|bēizi zài nàbian.|Cái cốc ở bên kia.
后边 是 谁？|hòubian shì shéi?|Phía sau là ai?
我 的 钱 在 里边。|wǒ de qián zài lǐbian.|Tiền của tôi ở bên trong.
上边 有 东西， 下边 没有。|shàngbian yǒu dōngxi, xiàbian méiyǒu.|Phía trên có đồ, phía dưới không có.
他 一边 吃 东西， 一边 喝 茶。|tā yìbiān chī dōngxi, yìbiān hē chá.|Anh ấy vừa ăn vừa uống trà.
门 在 那边。|mén zài nàbian.|Cửa ở bên kia.
桌子 上 有 一 个 手机。|zhuōzi shàng yǒu yí ge shǒujī.|Trên bàn có một cái điện thoại.
床 上 有 很 多 衣服。|chuáng shàng yǒu hěn duō yīfu.|Trên giường có rất nhiều quần áo.
电话 在 桌子 上。|diànhuà zài zhuōzi shàng.|Điện thoại ở trên bàn.
电脑 在 我 的 房间 里。|diànnǎo zài wǒ de fángjiān lǐ.|Máy tính ở trong phòng tôi.
这 是 东， 那 是 西。|zhè shì dōng, nà shì xī.|Đây là phía đông, kia là phía tây.
我 儿子 上 小学。|wǒ érzi shàng xiǎoxué.|Con trai tôi học tiểu học.
书包 里 有 课本 和 本子。|shūbāo lǐ yǒu kèběn hé běnzi.|Trong cặp có sách giáo khoa và vở.
书 里 有 很 多 知识。|shū lǐ yǒu hěn duō zhīshi.|Trong sách có rất nhiều kiến thức.`],

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
请 进来 坐 吧。|qǐng jìnlai zuò ba.|Mời vào ngồi nhé.
今天 你 去 哪儿？|jīntiān nǐ qù nǎr?|Hôm nay bạn đi đâu?
后天 他 来 我 家。|hòutiān tā lái wǒ jiā.|Ngày kia anh ấy đến nhà tôi.
你 什么 时候 来？|nǐ shénme shíhou lái?|Khi nào bạn đến?
我 晚上 七 点 来。|wǒ wǎnshang qī diǎn lái.|Tôi đến lúc bảy giờ tối.
第二 天 他 来 了。|dì'èr tiān tā lái le.|Ngày thứ hai anh ấy đến.
上次 你 去 了 哪儿？ 下次 我 也 去。|shàngcì nǐ qù le nǎr? xiàcì wǒ yě qù.|Lần trước bạn đã đi đâu? Lần sau tôi cũng đi.
我 马上 来！|wǒ mǎshàng lái!|Tôi đến ngay!
他 最后 来。|tā zuìhòu lái.|Anh ấy đến cuối cùng.
我 饿 了， 我们 去 吃饭。|wǒ è le, wǒmen qù chīfàn.|Tôi đói rồi, chúng ta đi ăn cơm.
我们 走 吧。|wǒmen zǒu ba.|Chúng ta đi thôi.
你 什么 时候 回家？|nǐ shénme shíhou huíjiā?|Khi nào bạn về nhà?
我 晚上 六 点 回家。|wǒ wǎnshang liù diǎn huíjiā.|Tôi về nhà lúc sáu giờ tối.
妈妈 回来 了。|māma huílai le.|Mẹ về rồi.
我 明天 回去。|wǒ míngtiān huíqu.|Ngày mai tôi quay về.
他 回到 家 了。|tā huídào jiā le.|Anh ấy về đến nhà rồi.
请 进来！|qǐng jìnlai!|Mời vào trong!
你 进去 吧。|nǐ jìnqu ba.|Bạn vào đi.
他 出去 了。|tā chūqu le.|Anh ấy ra ngoài rồi.
请 坐下。|qǐng zuòxia.|Xin mời ngồi xuống.
你们 起来 吧。|nǐmen qǐlai ba.|Các bạn đứng dậy đi.
他 跑 了。|tā pǎo le.|Nó chạy mất rồi.
我 走路 去。|wǒ zǒulù qù.|Tôi đi bộ đến đó.
我 到 了！|wǒ dào le!|Tôi đến rồi!
我 坐 在 爸爸 和 妈妈 中间。|wǒ zuò zài bàba hé māma zhōngjiān.|Tôi ngồi giữa bố và mẹ.
请 到 这边 来。|qǐng dào zhèbian lái.|Mời đến bên này.
你 上 来 吧。|nǐ shàng lái ba.|Bạn lên đây đi.
他 下 来 了。|tā xià lái le.|Anh ấy xuống rồi.
我 去 洗 杯子。|wǒ qù xǐ bēizi.|Tôi đi rửa cốc.`],

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
我们 在 路口 下车。|wǒmen zài lùkǒu xiàchē.|Chúng tôi xuống xe ở ngã tư.
我 是 中国 人。|wǒ shì Zhōngguó rén.|Tôi là người Trung Quốc.
她 是 外国 人。|tā shì wàiguó rén.|Cô ấy là người nước ngoài.
我 是 北京 人。|wǒ shì Běijīng rén.|Tôi là người Bắc Kinh.
我 有 一 个 中国 朋友。|wǒ yǒu yí ge Zhōngguó péngyou.|Tôi có một người bạn Trung Quốc.
你 有 多少 中国 朋友？|nǐ yǒu duōshao Zhōngguó péngyou?|Bạn có bao nhiêu người bạn Trung Quốc?
我 的 中国 朋友 很 少。|wǒ de Zhōngguó péngyou hěn shǎo.|Bạn Trung Quốc của tôi rất ít.
我 没有 外国 朋友。|wǒ méiyǒu wàiguó péngyou.|Tôi không có bạn nước ngoài.
明天 上午 我 去 北京。|míngtiān shàngwǔ wǒ qù Běijīng.|Sáng mai tôi đi Bắc Kinh.
我 去年 去 了 北京。|wǒ qùnián qù le Běijīng.|Năm ngoái tôi đã đi Bắc Kinh.
他 明年 来 中国。|tā míngnián lái Zhōngguó.|Năm sau anh ấy đến Trung Quốc.
这 是 我 第 一 次 来 中国。|zhè shì wǒ dì yī cì lái Zhōngguó.|Đây là lần đầu tiên tôi đến Trung Quốc.
我 来到 了 北京。|wǒ láidào le Běijīng.|Tôi đã đến Bắc Kinh.
他 回 中国 了。|tā huí Zhōngguó le.|Anh ấy về Trung Quốc rồi.
我 住 在 北京。|wǒ zhù zài Běijīng.|Tôi sống ở Bắc Kinh.
我们 打车 去 吧。|wǒmen dǎchē qù ba.|Chúng ta bắt taxi đi nhé.
他 坐 火车 回家。|tā zuò huǒchē huíjiā.|Anh ấy đi tàu hỏa về nhà.
车站 在 哪儿？|chēzhàn zài nǎr?|Bến xe ở đâu?
上车 吧！|shàngchē ba!|Lên xe đi!
车上 人 很 多。|chēshang rén hěn duō.|Trên xe rất đông người.
门票 多少 钱？|ménpiào duōshao qián?|Vé vào cửa bao nhiêu tiền?
这 是 你 的 票 吗？|zhè shì nǐ de piào ma?|Đây là vé của bạn à?
这 是 谁 的 汽车？|zhè shì shéi de qìchē?|Đây là ô tô của ai?
车 在 门口。|chē zài ménkǒu.|Xe ở cửa.
飞机 飞 了。|fēijī fēi le.|Máy bay cất cánh rồi.
路上 有 很 多 车。|lùshang yǒu hěn duō chē.|Trên đường có rất nhiều xe.
这 个 地方 很 好。|zhè ge dìfang hěn hǎo.|Nơi này rất tốt.
地点 在 哪儿？|dìdiǎn zài nǎr?|Địa điểm ở đâu?
我 有 北京 地图。|wǒ yǒu Běijīng dìtú.|Tôi có bản đồ Bắc Kinh.
我 在 北京 大学 学习 汉语。|wǒ zài Běijīng dàxué xuéxí Hànyǔ.|Tôi học tiếng Hán ở Đại học Bắc Kinh.`],

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
我 找到 我 的 钱包 了。|wǒ zhǎodào wǒ de qiánbāo le.|Tôi tìm thấy ví của tôi rồi.
太 贵 了！|tài guì le!|Đắt quá!
我们 去 商店 买 东西 吧。|wǒmen qù shāngdiàn mǎi dōngxi ba.|Chúng ta đi cửa hàng mua đồ nhé.
书店 在 哪儿？|shūdiàn zài nǎr?|Hiệu sách ở đâu?
给 我 一 杯 水， 谢谢。|gěi wǒ yì bēi shuǐ, xièxie.|Cho tôi một cốc nước, cảm ơn.
你 找 什么？ 我 找 我 的 杯子。|nǐ zhǎo shénme? wǒ zhǎo wǒ de bēizi.|Bạn tìm gì? – Tôi tìm cái cốc của tôi.
我 找到 了！|wǒ zhǎodào le!|Tôi tìm thấy rồi!
这 个 三 块 五 毛。|zhè ge sān kuài wǔ máo.|Cái này ba đồng năm hào.
一 元 是 十 毛。|yì yuán shì shí máo.|Một tệ là mười hào.
商店 在 前边。|shāngdiàn zài qiánbian.|Cửa hàng ở phía trước.
左边 是 书店， 右边 是 商店。|zuǒbian shì shūdiàn, yòubian shì shāngdiàn.|Bên trái là hiệu sách, bên phải là cửa hàng.
商场 旁边 有 一 个 书店。|shāngchǎng pángbiān yǒu yí ge shūdiàn.|Bên cạnh trung tâm thương mại có một hiệu sách.
我 给 妈妈 打电话。|wǒ gěi māma dǎdiànhuà.|Tôi gọi điện cho mẹ.
这 是 你 的 包 吗？|zhè shì nǐ de bāo ma?|Đây là túi của bạn à?
我 买 了 车票。|wǒ mǎi le chēpiào.|Tôi mua vé xe rồi.
机票 贵 吗？|jīpiào guì ma?|Vé máy bay có đắt không?
医院 在 东边。|yīyuàn zài dōngbian.|Bệnh viện ở phía đông.
饭店 在 西边。|fàndiàn zài xībian.|Nhà hàng ở phía tây.
图书馆 在 南边， 电影院 在 北边。|túshūguǎn zài nánbian, diànyǐngyuàn zài běibian.|Thư viện ở phía nam, rạp chiếu phim ở phía bắc.
这 个 地图 很 有用。|zhè ge dìtú hěn yǒuyòng.|Tấm bản đồ này rất hữu ích.
我 送 你 回家。|wǒ sòng nǐ huíjiā.|Tôi đưa bạn về nhà.
我 花 了 很 多 钱。|wǒ huā le hěn duō qián.|Tôi đã tiêu rất nhiều tiền.
你 的 钱包 在 地上。|nǐ de qiánbāo zài dìshang.|Ví của bạn ở dưới đất.
教学楼 在 图书馆 旁边。|jiàoxuélóu zài túshūguǎn pángbiān.|Tòa nhà dạy học ở cạnh thư viện.`],

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
他 唱歌 很 好听。|tā chànggē hěn hǎotīng.|Anh ấy hát rất hay.
你 几 点 睡觉？|nǐ jǐ diǎn shuìjiào?|Mấy giờ bạn đi ngủ?
孩子 睡 了。|háizi shuì le.|Đứa trẻ ngủ rồi.
我 爱 我 的 家。|wǒ ài wǒ de jiā.|Tôi yêu gia đình tôi.
我们 去 打球 吧。|wǒmen qù dǎqiú ba.|Chúng ta đi chơi bóng nhé.
你 喜欢 打 什么 球？|nǐ xǐhuan dǎ shénme qiú?|Bạn thích chơi môn bóng gì?
她 很 喜欢 唱歌。|tā hěn xǐhuan chànggē.|Cô ấy rất thích hát.
这 个 歌 很 好听。|zhè ge gē hěn hǎotīng.|Bài hát này rất hay.
小朋友 在 外边 玩儿。|xiǎopéngyou zài wàibian wánr.|Các em nhỏ đang chơi ở ngoài.
北京 很 好玩儿。|Běijīng hěn hǎowánr.|Bắc Kinh rất vui.
我 在 网上 买 东西。|wǒ zài wǎngshang mǎi dōngxi.|Tôi mua đồ trên mạng.
我 开玩笑 呢！|wǒ kāiwánxiào ne!|Tôi đùa thôi mà!
这 个 电影 很 好看。|zhè ge diànyǐng hěn hǎokàn.|Bộ phim này rất hay.
他 笑 了。|tā xiào le.|Anh ấy cười rồi.
我们 什么 时候 放假？|wǒmen shénme shíhou fàngjià?|Khi nào chúng ta được nghỉ?`],

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
请 帮 我 开 门。|qǐng bāng wǒ kāi mén.|Làm ơn mở cửa giúp tôi.
请 等 一会儿。|qǐng děng yíhuìr.|Xin chờ một lát.
你 做 什么 工作？|nǐ zuò shénme gōngzuò?|Bạn làm công việc gì?
你 在 哪儿 工作？|nǐ zài nǎr gōngzuò?|Bạn làm việc ở đâu?
我 在 北京 工作。|wǒ zài Běijīng gōngzuò.|Tôi làm việc ở Bắc Kinh.
白天 我 工作， 晚上 我 在 家。|báitiān wǒ gōngzuò, wǎnshang wǒ zài jiā.|Ban ngày tôi làm việc, buổi tối tôi ở nhà.
星期日 我 不 工作。|xīngqīrì wǒ bù gōngzuò.|Chủ nhật tôi không làm việc.
我 在 中国 工作 了 半年。|wǒ zài Zhōngguó gōngzuò le bànnián.|Tôi đã làm việc ở Trung Quốc nửa năm.
我 等 了 半天。|wǒ děng le bàntiān.|Tôi đã đợi mãi.
十 月 二 日 我 不 工作。|shí yuè èr rì wǒ bù gōngzuò.|Ngày 2 tháng 10 tôi không làm việc.
他 在 外边 等 你。|tā zài wàibian děng nǐ.|Anh ấy đợi bạn ở bên ngoài.
请 开 门。|qǐng kāi mén.|Xin mở cửa.
他 在 国外 工作。|tā zài guówài gōngzuò.|Anh ấy làm việc ở nước ngoài.
他 在 学院 工作。|tā zài xuéyuàn gōngzuò.|Anh ấy làm việc ở học viện.
你 几 点 上班？|nǐ jǐ diǎn shàngbān?|Mấy giờ bạn đi làm?
我 下午 五 点 下班。|wǒ xiàwǔ wǔ diǎn xiàbān.|Tôi tan làm lúc năm giờ chiều.
明天 上午 我们 开会。|míngtiān shàngwǔ wǒmen kāihuì.|Sáng mai chúng ta họp.
我 有 事。|wǒ yǒu shì.|Tôi có việc.
请 打开 你 的 书。|qǐng dǎkāi nǐ de shū.|Mời mở sách của bạn ra.
请 关 门。|qǐng guān mén.|Xin đóng cửa.
请 关上 电视。|qǐng guānshang diànshì.|Xin tắt ti vi đi.
书 放 在 桌子 上 吧。|shū fàng zài zhuōzi shàng ba.|Để sách lên bàn nhé.
谢谢 你 帮忙！|xièxie nǐ bāngmáng!|Cảm ơn bạn đã giúp!
我 在 准备 考试。|wǒ zài zhǔnbèi kǎoshì.|Tôi đang chuẩn bị thi.
我 有时 走路 上班。|wǒ yǒushí zǒulù shàngbān.|Tôi có lúc đi bộ đi làm.`],

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
我 不 知道。|wǒ bù zhīdào.|Tôi không biết.
你 会 说 汉语 吗？|nǐ huì shuō Hànyǔ ma?|Bạn biết nói tiếng Hán không?
我 会 说 中文。|wǒ huì shuō Zhōngwén.|Tôi biết nói tiếng Trung.
你 的 朋友 叫 什么 名字？|nǐ de péngyou jiào shénme míngzi?|Bạn của bạn tên là gì?
小姐， 请问 你 叫 什么 名字？|xiǎojie, qǐngwèn nǐ jiào shénme míngzi?|Thưa cô, xin hỏi cô tên là gì?
你 想 吃 什么？|nǐ xiǎng chī shénme?|Bạn muốn ăn gì?
我 想 吃 米饭。|wǒ xiǎng chī mǐfàn.|Tôi muốn ăn cơm.
我 要 一 杯 茶。|wǒ yào yì bēi chá.|Tôi muốn một cốc trà.
我 很 想 吃 水果。|wǒ hěn xiǎng chī shuǐguǒ.|Tôi rất muốn ăn hoa quả.
你 想 买 什么？|nǐ xiǎng mǎi shénme?|Bạn muốn mua gì?
今天 你 想 穿 什么？|jīntiān nǐ xiǎng chuān shénme?|Hôm nay bạn muốn mặc gì?
你 会 开车 吗？|nǐ huì kāichē ma?|Bạn biết lái xe không?
我 不 认识 路。|wǒ bú rènshi lù.|Tôi không biết đường.
我 想 学 中文。|wǒ xiǎng xué Zhōngwén.|Tôi muốn học tiếng Trung.
你 会 说 什么 外语？|nǐ huì shuō shénme wàiyǔ?|Bạn biết nói ngoại ngữ gì?
他 不 想 说话。|tā bù xiǎng shuōhuà.|Anh ấy không muốn nói chuyện.
我 忘 了 他 的 名字。|wǒ wàng le tā de míngzi.|Tôi quên tên anh ấy rồi.
我 明天 要 请假。|wǒ míngtiān yào qǐngjià.|Ngày mai tôi phải xin nghỉ.
你 明天 想 干 什么？|nǐ míngtiān xiǎng gàn shénme?|Ngày mai bạn muốn làm gì?
我 喜欢 看 电影。|wǒ xǐhuan kàn diànyǐng.|Tôi thích xem phim.
你 看见 我 的 手机 了 吗？|nǐ kànjiàn wǒ de shǒujī le ma?|Bạn có nhìn thấy điện thoại của tôi không?
我 看到 他 了。|wǒ kàndào tā le.|Tôi thấy anh ấy rồi.
你 听见 了 吗？|nǐ tīngjiàn le ma?|Bạn nghe thấy không?
我 听到 有 人 叫 我。|wǒ tīngdào yǒu rén jiào wǒ.|Tôi nghe thấy có người gọi tôi.
明天 见！|míngtiān jiàn!|Mai gặp nhé!
我们 什么 时候 见面？|wǒmen shénme shíhou jiànmiàn?|Khi nào chúng ta gặp mặt?
请 告诉 我 你 的 名字。|qǐng gàosu wǒ nǐ de míngzi.|Xin cho tôi biết tên bạn.
他 得到 了 一 个 好 工作。|tā dédào le yí ge hǎo gōngzuò.|Anh ấy có được một công việc tốt.
你 能 来 吗？|nǐ néng lái ma?|Bạn có thể đến không?
我 去 医院 看病。|wǒ qù yīyuàn kànbìng.|Tôi đi bệnh viện khám bệnh.`],

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
汉语 不 太 难。|Hànyǔ bú tài nán.|Tiếng Hán không khó lắm.
对， 我 是 老师。|duì, wǒ shì lǎoshī.|Đúng, tôi là giáo viên.
不对， 他 不 是 学生。|búduì, tā bú shì xuésheng.|Không đúng, anh ấy không phải học sinh.
我 妹妹 很 小， 她 三 岁。|wǒ mèimei hěn xiǎo, tā sān suì.|Em gái tôi còn nhỏ, nó ba tuổi.
他 的 家 很 大。|tā de jiā hěn dà.|Nhà anh ấy rất to.
你 今年 多 大？ 我 今年 二 十 岁。|nǐ jīnnián duō dà? wǒ jīnnián èr shí suì.|Năm nay bạn bao nhiêu tuổi? – Năm nay tôi hai mươi tuổi.
这 个 商场 很 大。|zhè ge shāngchǎng hěn dà.|Trung tâm thương mại này rất lớn.
这 个 房子 很 大。|zhè ge fángzi hěn dà.|Ngôi nhà này rất to.
这 间 房间 很 小。|zhè jiān fángjiān hěn xiǎo.|Căn phòng này rất nhỏ.
这 个 电视机 太 大 了。|zhè ge diànshìjī tài dà le.|Cái ti vi này to quá.
中国 是 一 个 大 国家。|Zhōngguó shì yí ge dà guójiā.|Trung Quốc là một đất nước lớn.
我们 的 学校 很 大。|wǒmen de xuéxiào hěn dà.|Trường chúng tôi rất lớn.
汉语 难 吗？|Hànyǔ nán ma?|Tiếng Hán có khó không?
我 觉得 汉语 不 难。|wǒ juéde Hànyǔ bù nán.|Tôi thấy tiếng Hán không khó.
这 个 菜 真 好吃！|zhè ge cài zhēn hǎochī!|Món này ngon thật!
他 很 高。|tā hěn gāo.|Anh ấy rất cao.
我 的 手机 坏 了。|wǒ de shǒujī huài le.|Điện thoại của tôi hỏng rồi.
这 是 我 的 新 电脑。|zhè shì wǒ de xīn diànnǎo.|Đây là máy tính mới của tôi.
他 是 我 的 老 朋友。|tā shì wǒ de lǎo péngyou.|Anh ấy là bạn cũ của tôi.
快 来！|kuài lái!|Mau lại đây!
今天 太 热 了！|jīntiān tài rè le!|Hôm nay nóng quá!
你 忙 吗？ 我 很 忙。|nǐ máng ma? wǒ hěn máng.|Bạn bận không? – Tôi rất bận.
我 今天 很 累。|wǒ jīntiān hěn lèi.|Hôm nay tôi rất mệt.
我 的 房间 很 干净。|wǒ de fángjiān hěn gānjìng.|Phòng của tôi rất sạch sẽ.
他 的 衣服 是 白 的。|tā de yīfu shì bái de.|Quần áo của anh ấy màu trắng.
这 个 饭店 很 有名。|zhè ge fàndiàn hěn yǒumíng.|Nhà hàng này rất nổi tiếng.
学习 很 重要。|xuéxí hěn zhòngyào.|Học tập rất quan trọng.
我们 的 书 一样。|wǒmen de shū yíyàng.|Sách của chúng ta giống nhau.
我 错 了。|wǒ cuò le.|Tôi sai rồi.
他 的 汉语 不 差。|tā de Hànyǔ bú chà.|Tiếng Hán của anh ấy không tệ.
行！ 我 明天 来。|xíng! wǒ míngtiān lái.|Được! Mai tôi đến.
这 个 包 很 重。|zhè ge bāo hěn zhòng.|Cái túi này rất nặng.
这 个 动作 很 难。|zhè ge dòngzuò hěn nán.|Động tác này rất khó.`],

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
明天 会 下雨。|míngtiān huì xiàyǔ.|Ngày mai sẽ mưa.
认识 你 很 高兴。|rènshi nǐ hěn gāoxìng.|Rất vui được làm quen với bạn.
外边 下雨 了。|wàibian xiàyǔ le.|Bên ngoài trời mưa rồi.
今天 风 很 大。|jīntiān fēng hěn dà.|Hôm nay gió rất to.
明天 有 雨。|míngtiān yǒu yǔ.|Ngày mai có mưa.
我 生病 了。|wǒ shēngbìng le.|Tôi bị ốm rồi.
他 的 病 好 了。|tā de bìng hǎo le.|Bệnh của anh ấy khỏi rồi.
我 身上 没有 钱。|wǒ shēnshang méiyǒu qián.|Trên người tôi không có tiền.
你 洗 手 了 吗？|nǐ xǐ shǒu le ma?|Bạn rửa tay chưa?
我们 去 山 上 玩儿 吧。|wǒmen qù shān shàng wánr ba.|Chúng ta lên núi chơi nhé.`],

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
我们 一起 去 吧。|wǒmen yìqǐ qù ba.|Chúng ta cùng đi nhé.
请 等 一下儿。|qǐng děng yíxiàr.|Xin đợi một chút.
他 没 说 什么。|tā méi shuō shénme.|Anh ấy không nói gì.
我 想 买 一些 水果。|wǒ xiǎng mǎi yìxiē shuǐguǒ.|Tôi muốn mua một ít hoa quả.
你 拿 一下儿。|nǐ ná yíxiàr.|Bạn cầm giúp một chút.
你 要 一点儿 茶 吗？|nǐ yào yìdiǎnr chá ma?|Bạn muốn một chút trà không?
我们 一块儿 去 吃饭 吧。|wǒmen yíkuàir qù chīfàn ba.|Chúng ta cùng đi ăn cơm nhé.
你 出来 一下儿。|nǐ chūlai yíxiàr.|Bạn ra đây một chút.
你 用 一下儿 我 的 手机 吧。|nǐ yòng yíxiàr wǒ de shǒujī ba.|Bạn dùng điện thoại của tôi đi.
我 送 她 一些 花。|wǒ sòng tā yìxiē huā.|Tôi tặng cô ấy một ít hoa.
我 问 你 一下儿。|wǒ wèn nǐ yíxiàr.|Tôi hỏi bạn một chút.
你 试 一下儿。|nǐ shì yíxiàr.|Bạn thử một chút đi.
我们 听 一下儿 课文。|wǒmen tīng yíxiàr kèwén.|Chúng ta nghe bài khóa một chút.
你 记 一下儿。|nǐ jì yíxiàr.|Bạn ghi lại một chút.
你 帮 我 一下儿， 好 吗？|nǐ bāng wǒ yíxiàr, hǎo ma?|Bạn giúp tôi một chút được không?
我们 休息 一下儿 吧。|wǒmen xiūxi yíxiàr ba.|Chúng ta nghỉ một chút nhé.
他 正在 工作。|tā zhèngzài gōngzuò.|Anh ấy đang làm việc.
我 正 想 给 你 打电话。|wǒ zhèng xiǎng gěi nǐ dǎdiànhuà.|Tôi đang định gọi điện cho bạn.
你 唱 一下儿 吧！|nǐ chàng yíxiàr ba!|Bạn hát một chút đi!
我 晚上 常常 上网。|wǒ wǎnshang chángcháng shàngwǎng.|Buổi tối tôi thường lên mạng.
你 喝 茶 还是 喝 水？|nǐ hē chá háishi hē shuǐ?|Bạn uống trà hay uống nước?
我 介绍 一下儿， 这 是 我 的 朋友。|wǒ jièshào yíxiàr, zhè shì wǒ de péngyou.|Tôi xin giới thiệu, đây là bạn của tôi.
他 还 在 睡觉。|tā hái zài shuìjiào.|Anh ấy vẫn đang ngủ.
请 再 说 一 次。|qǐng zài shuō yí cì.|Xin nói lại một lần nữa.
我 马上 就 来。|wǒ mǎshàng jiù lái.|Tôi đến ngay đây.
真的 吗？|zhēnde ma?|Thật không?
我 最 喜欢 看 电影。|wǒ zuì xǐhuan kàn diànyǐng.|Tôi thích xem phim nhất.
你 最好 明天 来。|nǐ zuìhǎo míngtiān lái.|Tốt nhất là bạn đến vào ngày mai.
非常 好！|fēicháng hǎo!|Rất tốt!
不用 谢谢！|búyòng xièxie!|Không cần cảm ơn đâu!
请 慢 一点儿 说。|qǐng màn yìdiǎnr shuō.|Xin nói chậm một chút.
这 个 房间 不大。|zhè ge fángjiān búdà.|Phòng này không to lắm.
有的 人 喜欢 喝 茶， 有的 人 喜欢 喝 水。|yǒude rén xǐhuan hē chá, yǒude rén xǐhuan hē shuǐ.|Có người thích uống trà, có người thích uống nước.
有些 字 很 难 写。|yǒuxiē zì hěn nán xiě.|Có một số chữ rất khó viết.
我 有一些 中国 朋友。|wǒ yǒuyìxiē Zhōngguó péngyou.|Tôi có một vài người bạn Trung Quốc.`],

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
你 是 不 是 老师？|nǐ shì bu shì lǎoshī?|Bạn có phải là giáo viên không?
你 是 哪 国 人？|nǐ shì nǎ guó rén?|Bạn là người nước nào?
这儿 有 三 个 男生 和 两 个 女生。|zhèr yǒu sān ge nánshēng hé liǎng ge nǚshēng.|Ở đây có ba bạn nam và hai bạn nữ.
那儿 有 很 多 老人 和 小孩儿。|nàr yǒu hěn duō lǎorén hé xiǎoháir.|Ở đó có nhiều người già và trẻ con.
医生 在 这儿， 病人 在 那儿。|yīshēng zài zhèr, bìngrén zài nàr.|Bác sĩ ở đây, bệnh nhân ở kia.
这儿 的 男人 和 女人 都 是 工人。|zhèr de nánrén hé nǚrén dōu shì gōngrén.|Đàn ông và phụ nữ ở đây đều là công nhân.
这些 衣服 都 很 贵。|zhèxiē yīfu dōu hěn guì.|Những bộ quần áo này đều rất đắt.
那些 东西 是 谁 的？|nàxiē dōngxi shì shéi de?|Những đồ kia là của ai?
你 要 哪些？|nǐ yào nǎxiē?|Bạn muốn những cái nào?
他 站 在 那儿。|tā zhàn zài nàr.|Anh ấy đứng ở đó.
你 坐 这儿 吧。|nǐ zuò zhèr ba.|Bạn ngồi đây nhé.
杯子 在 哪里？|bēizi zài nǎlǐ?|Cái cốc ở đâu?
这里 是 哪里？|zhèlǐ shì nǎlǐ?|Đây là đâu?
那里 有 很 多 人。|nàlǐ yǒu hěn duō rén.|Ở đó có rất nhiều người.
你 常 来 这儿 吗？|nǐ cháng lái zhèr ma?|Bạn có hay đến đây không?
那儿 有 很 多 树。|nàr yǒu hěn duō shù.|Ở đó có rất nhiều cây.
他 是不是 你 的 朋友？|tā shìbushì nǐ de péngyou?|Anh ấy có phải là bạn của bạn không?`],

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
我 跟 朋友 一起 吃饭。|wǒ gēn péngyou yìqǐ chīfàn.|Tôi ăn cơm cùng bạn.
我 去 过 北京。|wǒ qù guo Běijīng.|Tôi đã từng đến Bắc Kinh.
他 从 北京 来。|tā cóng Běijīng lái.|Anh ấy đến từ Bắc Kinh.
我 跟 朋友 一起 去。|wǒ gēn péngyou yìqǐ qù.|Tôi đi cùng bạn.
我们 过 马路 吧。|wǒmen guò mǎlù ba.|Chúng ta qua đường nhé.
别 说 了！|bié shuō le!|Đừng nói nữa!
你 要 别的 吗？|nǐ yào biéde ma?|Bạn có cần gì khác không?
别 忘记 明天 的 考试。|bié wàngjì míngtiān de kǎoshì.|Đừng quên bài thi ngày mai.
门 开 着。|mén kāi zhe.|Cửa đang mở.
还有 别的 吗？|háiyǒu biéde ma?|Còn gì khác không?
我 比 他 高。|wǒ bǐ tā gāo.|Tôi cao hơn anh ấy.
他 认真 地 学习 汉语。|tā rènzhēn de xuéxí Hànyǔ.|Anh ấy học tiếng Hán một cách chăm chỉ.
别 生气！|bié shēngqì!|Đừng giận!
别 动！|bié dòng!|Đừng động đậy!`]
];

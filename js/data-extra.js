/* ===== Pinyin ===== */
window.PINYIN = {
  tones: [
    {t:1, mark:'ā', name:'Thanh 1', shape:'ˉ', tip:'Giọng cao và giữ đều, kéo dài. Gần thanh ngang tiếng Việt nhưng cao hơn (gần đúng). Lỗi hay gặp: đọc thấp hoặc hạ giọng ở cuối.', ex:[['妈','mā','mẹ'],['八','bā','tám'],['七','qī','bảy']]},
    {t:2, mark:'á', name:'Thanh 2', shape:'ˊ', tip:'Đi từ giữa lên cao, như khi hỏi lại "hả?". Gần dấu sắc (gần đúng) nhưng lên đều và dài hơn, không gấp.', ex:[['麻','má','cây gai'],['十','shí','mười'],['茶','chá','trà']]},
    {t:3, mark:'ǎ', name:'Thanh 3', shape:'ˇ', tip:'Hạ thấp xuống rồi mới lên lại (khi đọc riêng hoặc cuối câu). Gần dấu hỏi nhưng trầm và dài hơn. Đứng trước thanh khác thường chỉ đọc phần thấp.', ex:[['马','mǎ','ngựa'],['五','wǔ','năm'],['好','hǎo','tốt']]},
    {t:4, mark:'à', name:'Thanh 4', shape:'ˋ', tip:'Rơi nhanh từ cao xuống thấp, dứt khoát, như khi ra lệnh "Đi!". Đừng đọc thành dấu huyền (thấp, đi ngang) hay dấu nặng (bị ngắt).', ex:[['骂','mà','mắng'],['四','sì','bốn'],['大','dà','to']]},
    {t:0, mark:'a', name:'Thanh nhẹ', shape:'·', tip:'Đọc nhẹ, ngắn, không nhấn; độ cao phụ thuộc âm tiết đứng trước. Thường ở âm tiết sau: 妈妈 māma, 吗 ma.', ex:[['吗','ma','không?'],['的','de','của'],['了','le','rồi']]}
  ],
  sets: [ /* nhóm 4 thanh cùng âm để luyện nghe */
    [['妈','mā'],['麻','má'],['马','mǎ'],['骂','mà']],
    [['八','bā'],['拔','bá'],['把','bǎ'],['爸','bà']],
    [['衣','yī'],['姨','yí'],['椅','yǐ'],['意','yì']],
    [['屋','wū'],['无','wú'],['五','wǔ'],['物','wù']],
    [['汤','tāng'],['糖','táng'],['躺','tǎng'],['烫','tàng']],
    [['诗','shī'],['十','shí'],['使','shǐ'],['是','shì']],
    [['飞','fēi'],['肥','féi'],['匪','fěi'],['费','fèi']],
    [['七','qī'],['骑','qí'],['起','qǐ'],['气','qì']],
    [['通','tōng'],['同','tóng'],['桶','tǒng'],['痛','tòng']],
    [['家','jiā'],['夹','jiá'],['假','jiǎ'],['架','jià']],
    [['烟','yān'],['盐','yán'],['眼','yǎn'],['燕','yàn']],
    [['书','shū'],['熟','shú'],['鼠','shǔ'],['树','shù']]
  ],
  initials: [
    {g:'Âm môi', items:[['b','波','bō','Hai môi khép rồi mở, KHÔNG bật hơi, dây thanh không rung. Gần "p" trong "pin" (gần đúng); đừng đọc thành "b" tiếng Việt (có rung).'],['p','坡','pō','Vị trí như b nhưng bật mạnh một luồng hơi (để tờ giấy trước miệng sẽ thấy giấy động). Tiếng Việt không có âm này ở đầu từ.'],['m','摸','mō','Hai môi khép, hơi đi ra đường mũi. Gần giống "m" tiếng Việt.'],['f','佛','fó','Răng trên chạm nhẹ môi dưới, hơi đi qua khe hở. Gần giống "ph" tiếng Việt.']]},
    {g:'Âm đầu lưỡi', items:[['d','得','dé','Đầu lưỡi chạm chân răng trên rồi bật ra, KHÔNG bật hơi. Gần "t" tiếng Việt (gần đúng); đừng đọc thành "đ" (có rung).'],['t','特','tè','Vị trí như d nhưng bật mạnh hơi. Gần "th" tiếng Việt (gần đúng).'],['n','讷','nè','Đầu lưỡi chạm chân răng trên, hơi đi ra đường mũi. Gần giống "n" tiếng Việt.'],['l','勒','lè','Đầu lưỡi chạm chân răng trên, hơi đi ra hai bên lưỡi. Gần giống "l" tiếng Việt; chú ý đừng lẫn với n.']]},
    {g:'Âm cuống lưỡi', items:[['g','哥','gē','Cuống lưỡi chặn ở vòm mềm rồi bật ra, KHÔNG bật hơi. Gần "c/k" tiếng Việt (gần đúng); không đọc thành "g" tiếng Việt (âm xát).'],['k','科','kē','Vị trí như g nhưng bật mạnh hơi. KHÔNG giống "kh" tiếng Việt: k chặn rồi bật ra, còn "kh" là hơi cọ xát.'],['h','喝','hē','Cuống lưỡi nâng gần vòm mềm, hơi cọ xát đi ra. Nghe gần "kh" tiếng Việt hơn là "h" (gần đúng).']]},
    {g:'Âm mặt lưỡi', items:[['j','鸡','jī','Mặt lưỡi áp vào vòm cứng, đầu lưỡi hạ sau răng dưới, môi dẹt, KHÔNG bật hơi. Gần "ch" tiếng Việt (gần đúng). Chỉ đi với i, ü.'],['q','七','qī','Vị trí như j nhưng bật mạnh hơi. Không đọc như chữ "q" hay "qu" tiếng Việt. Chỉ đi với i, ü.'],['x','西','xī','Vị trí như j, q nhưng hơi cọ xát liên tục, môi dẹt như cười. Khác "x" tiếng Việt: mặt lưỡi áp vòm cứng, đầu lưỡi hạ thấp.']]},
    {g:'Âm uốn lưỡi', items:[['zh','知','zhī','Đầu lưỡi cong lên chạm phía sau lợi trên rồi bật ra, KHÔNG bật hơi. Gần "tr" khi đọc uốn lưỡi (gần đúng).'],['ch','吃','chī','Vị trí như zh (đầu lưỡi cong lên) nhưng bật mạnh hơi.'],['sh','诗','shī','Đầu lưỡi cong lên gần vòm cứng, không chạm, hơi cọ xát đi ra. Gần "s" khi đọc uốn lưỡi (gần đúng).'],['r','日','rì','Vị trí như sh nhưng dây thanh rung, hơi cọ xát rất nhẹ. Lưỡi KHÔNG rung hay đánh lưỡi. Khó mô tả bằng chữ: nghe mẫu và bắt chước.']]},
    {g:'Âm đầu lưỡi trước', items:[['z','资','zī','Đầu lưỡi đặt sau răng trên, chặn rồi thả ra kèm cọ xát (như "ts" đọc liền), KHÔNG bật hơi. Không giống "ch" tiếng Việt.'],['c','次','cì','Vị trí như z nhưng bật mạnh hơi (như "ts" kèm luồng hơi).'],['s','思','sī','Đầu lưỡi gần sau răng trên, hơi cọ xát đi ra. Gần giống "x" tiếng Việt.']]},
    {g:'Bán nguyên âm', items:[['y','衣','yī','Không phải một âm riêng: là cách viết i khi đứng đầu âm tiết (yi đọc là i, ya là ia).'],['w','乌','wū','Không phải một âm riêng: là cách viết u khi đứng đầu âm tiết (wu đọc là u, wa là ua).']]}
  ],
  finals: [
    {g:'Vận mẫu đơn', items:[['a','啊','ā','Miệng mở rộng, lưỡi hạ thấp. Gần giống "a" tiếng Việt.'],['o','哦','ó','Môi tròn, miệng mở vừa. Gần "ô" (gần đúng); sau b, p, m, f nghe như có u lướt nhẹ phía trước: bo gần "buô".'],['e','鹅','é','Lưỡi lùi về sau, miệng mở vừa, môi KHÔNG tròn. Gần "ơ" nhưng sâu trong họng hơn (gần đúng); không đọc thành "e" tiếng Việt.'],['i','衣','yī','Môi dẹt như cười, lưỡi nâng cao. Gần "i" tiếng Việt. Lưu ý: sau z, c, s, zh, ch, sh, r thì i không đọc là "i" mà giữ vị trí lưỡi của phụ âm (nghe mẫu zi, shi).'],['u','乌','wū','Môi tròn và chụm ra trước, lưỡi lùi sau. Gần giống "u" tiếng Việt.'],['ü','鱼','yú','Đặt lưỡi như đọc i, giữ nguyên lưỡi rồi chụm tròn môi như u. Là MỘT âm, không đọc thành hai âm "u-i" hay "uy".']]},
    {g:'Vận mẫu kép', items:[['ai','爱','ài','Từ a lướt sang i. Gần giống "ai" tiếng Việt.'],['ei','黑','hēi','Bắt đầu gần "ê" rồi lướt sang i. Gần "ây" (gần đúng).'],['ao','奥','ào','Từ a lướt về phía o/u, môi tròn dần. Gần giống "ao" tiếng Việt.'],['ou','欧','ōu','Từ o lướt sang u, môi tròn. Gần "âu" (gần đúng) nhưng môi tròn hơn.'],['ia','鸭','yā','i lướt nhanh sang a, đọc liền một hơi. Đứng đầu viết là ya.'],['ie','椰','yē','i lướt sang "ê". Gần "iê" tiếng Việt. Đứng đầu viết là ye.'],['ua','蛙','wā','u lướt sang a. Gần "oa" tiếng Việt. Đứng đầu viết là wa.'],['uo','我','wǒ','u lướt sang o, môi tròn suốt. Gần "uô" tiếng Việt. Đứng đầu viết là wo.'],['üe','月','yuè','ü lướt sang "ê", môi tròn ở đầu. Gần "uê" nhưng bắt đầu bằng ü (yue, jue, que, xue).'],['iao','要','yào','i lướt nhanh sang ao (i-a-o đọc liền). Không đọc thành "eo" hay "iêu".'],['iu','有','yǒu','Cách viết gọn của iou: i lướt sang ou. Gần "iêu" (gần đúng); ở thanh 3, 4 nghe rõ o hơn (yǒu, jiǔ, liù).'],['uai','外','wài','u lướt sang ai. Gần "oai" tiếng Việt. Đứng đầu viết là wai.'],['ui','为','wèi','Cách viết gọn của uei: u lướt sang ei. Gần "uây" (gần đúng): guì, duì. Đứng đầu viết là wei.']]},
    {g:'Vận mẫu mũi', items:[['an','安','ān','a rồi đầu lưỡi chạm chân răng trên (n). Gần giống "an" tiếng Việt.'],['en','恩','ēn','Nguyên âm giữa (gần "ơ") rồi n. Gần "ân" tiếng Việt (gần đúng).'],['ang','昂','áng','a lùi về sau rồi cuống lưỡi nâng lên (ng), miệng mở rộng. Gần "ang" tiếng Việt.'],['eng','风','fēng','Nguyên âm giữa (gần "ơ") rồi ng. Gần "âng" (gần đúng).'],['ong','东','dōng','Môi tròn, từ u/ô sang ng. Gần "ung" (gần đúng); không ngậm môi ở cuối như "ông" tiếng Việt.'],['ian','烟','yān','i lướt sang an, a nghe gần "ê". Gần "iên" tiếng Việt. Đứng đầu viết là yan.'],['in','因','yīn','i rồi n, môi dẹt. Gần "in" tiếng Việt.'],['iang','羊','yáng','i lướt sang ang, đọc liền (yang). Không đọc thành "eng".'],['ing','英','yīng','i rồi ng ở cuống lưỡi. Gần "inh" (gần đúng) nhưng cuối là ng ở cuống lưỡi.'],['iong','用','yòng','i lướt sang ong, môi tròn. Gần "i-ung" đọc liền (yong).'],['uan','弯','wān','u lướt sang an. Gần "oan" tiếng Việt (wan). Sau j, q, x, y thì "uan" là üan.'],['un','文','wén','Cách viết gọn của uen: u lướt sang en. Gần "uân" (gần đúng): wen, dūn. Sau j, q, x, y thì "un" là ün.'],['uang','王','wáng','u lướt sang ang. Gần "oang" tiếng Việt (wang).'],['ueng','翁','wēng','u lướt sang eng; chỉ có trong âm tiết weng. Gần "uâng" (gần đúng).'],['üan','远','yuǎn','ü lướt sang an, a nghe gần "ê". Gần "uyên" (gần đúng): yuan, juan, quan, xuan.'],['ün','云','yún','ü rồi n, môi tròn. Gần "uyn" (gần đúng): yun, jun, qun, xun.']]},
    {g:'Vận mẫu đặc biệt', items:[['er','二','èr','Đọc nguyên âm giữa (gần "ơ") đồng thời cong đầu lưỡi lên. Là MỘT âm, không đọc thành hai âm "ơ-rơ".']]}
  ],
  contrasts: [ /* cặp dễ nhầm để luyện nghe */
    [['知','zhī'],['资','zī']], [['吃','chī'],['次','cì']], [['是','shì'],['四','sì']],
    [['八','bā'],['趴','pā']], [['大','dà'],['踏','tà']], [['哥','gē'],['科','kē']],
    [['鸡','jī'],['七','qī']], [['西','xī'],['诗','shī']], [['日','rì'],['力','lì']],
    [['鱼','yú'],['姨','yí']], [['半','bàn'],['棒','bàng']], [['真','zhēn'],['争','zhēng']],
    [['新','xīn'],['星','xīng']], [['船','chuán'],['床','chuáng']], [['女','nǚ'],['努','nǔ']]
  ]
};

/* ===== 214 bộ thủ: chữ|tên Hán Việt|nghĩa|số nét ===== */
window.RADICALS_RAW = `
一|nhất|số một|1
丨|cổn|nét sổ|1
丶|chủ|điểm, chấm|1
丿|phiệt|nét phẩy|1
乙|ất|can Ất|1
亅|quyết|nét móc|1
二|nhị|số hai|2
亠|đầu|nắp đậy|2
人 亻|nhân|người|2
儿|nhân (đi)|chân người|2
入|nhập|vào|2
八|bát|số tám|2
冂|quynh|vùng biên xa|2
冖|mịch|trùm khăn|2
冫|băng|nước đá|2
几|kỷ|ghế dựa|2
凵|khảm|há miệng|2
刀 刂|đao|con dao|2
力|lực|sức mạnh|2
勹|bao|bao bọc|2
匕|chủy|cái thìa|2
匚|phương|tủ đựng|2
匸|hệ|che đậy|2
十|thập|số mười|2
卜|bốc|xem bói|2
卩|tiết|đốt tre|2
厂|hán|sườn núi|2
厶|khư|riêng tư|2
又|hựu|lại nữa|2
口|khẩu|cái miệng|3
囗|vi|vây quanh|3
土|thổ|đất|3
士|sĩ|kẻ sĩ|3
夂|trĩ|đến sau|3
夊|tuy|đi chậm|3
夕|tịch|đêm tối|3
大|đại|to lớn|3
女|nữ|nữ giới|3
子|tử|con|3
宀|miên|mái nhà|3
寸|thốn|tấc|3
小|tiểu|nhỏ bé|3
尢|uông|yếu đuối|3
尸|thi|xác chết|3
屮|triệt|mầm non|3
山|sơn|núi|3
巛 川|xuyên|sông|3
工|công|người thợ|3
己|kỷ|bản thân|3
巾|cân|cái khăn|3
干|can|thiên can|3
幺|yêu|nhỏ nhắn|3
广|nghiễm|mái nhà rộng|3
廴|dẫn|bước dài|3
廾|củng|chắp tay|3
弋|dặc|bắn tên|3
弓|cung|cái cung|3
彐|kệ|đầu con nhím|3
彡|sam|lông dài|3
彳|xích|bước chân trái|3
心 忄|tâm|trái tim|4
戈|qua|cây qua|4
戶 户|hộ|cửa một cánh|4
手 扌|thủ|cái tay|4
支|chi|cành nhánh|4
攴 攵|phộc|đánh khẽ|4
文|văn|văn vẻ|4
斗|đẩu|cái đấu|4
斤|cân|cái rìu|4
方|phương|vuông|4
无|vô|không|4
日|nhật|mặt trời|4
曰|viết|nói rằng|4
月|nguyệt|mặt trăng|4
木|mộc|cây gỗ|4
欠|khiếm|thiếu|4
止|chỉ|dừng lại|4
歹|đãi|xấu xa|4
殳|thù|binh khí dài|4
毋|vô|chớ|4
比|tỷ|so sánh|4
毛|mao|lông|4
氏|thị|họ|4
气|khí|hơi|4
水 氵|thủy|nước|4
火 灬|hỏa|lửa|4
爪|trảo|móng vuốt|4
父|phụ|cha|4
爻|hào|hào âm dương|4
爿|tường|mảnh gỗ|4
片|phiến|mảnh, tấm|4
牙|nha|răng|4
牛|ngưu|con trâu|4
犬 犭|khuyển|con chó|4
玄|huyền|màu đen huyền|5
玉 王|ngọc|đá quý|5
瓜|qua|quả dưa|5
瓦|ngõa|ngói|5
甘|cam|ngọt|5
生|sinh|sinh sống|5
用|dụng|dùng|5
田|điền|ruộng|5
疋|thất|đơn vị vải|5
疒|nạch|bệnh tật|5
癶|bát|gạt ngược|5
白|bạch|màu trắng|5
皮|bì|da|5
皿|mãnh|bát đĩa|5
目|mục|con mắt|5
矛|mâu|cây mâu|5
矢|thỉ|mũi tên|5
石|thạch|đá|5
示 礻|thị|thần đất, chỉ bảo|5
禸|nhựu|vết chân thú|5
禾|hòa|cây lúa|5
穴|huyệt|hang lỗ|5
立|lập|đứng|5
竹|trúc|cây tre|6
米|mễ|gạo|6
糸 纟|mịch|sợi tơ|6
缶|phẫu|đồ sành|6
网|võng|cái lưới|6
羊|dương|con dê|6
羽|vũ|lông vũ|6
老|lão|già|6
而|nhi|mà, và|6
耒|lỗi|cái cày|6
耳|nhĩ|cái tai|6
聿|duật|cây bút|6
肉|nhục|thịt|6
臣|thần|bề tôi|6
自|tự|tự mình|6
至|chí|đến|6
臼|cữu|cái cối|6
舌|thiệt|cái lưỡi|6
舛|suyễn|sai lầm|6
舟|chu|cái thuyền|6
艮|cấn|quẻ Cấn, dừng|6
色|sắc|màu sắc|6
艸 艹|thảo|cỏ|6
虍|hô|vằn hổ|6
虫|trùng|sâu bọ|6
血|huyết|máu|6
行|hành|đi|6
衣 衤|y|áo|6
襾|á|che đậy|6
見 见|kiến|nhìn thấy|7
角|giác|cái sừng|7
言 讠|ngôn|lời nói|7
谷|cốc|khe nước|7
豆|đậu|hạt đậu|7
豕|thỉ|con lợn|7
豸|trãi|loài sâu không chân|7
貝 贝|bối|vỏ sò, tiền|7
赤|xích|màu đỏ|7
走|tẩu|chạy|7
足|túc|chân|7
身|thân|thân thể|7
車 车|xa|chiếc xe|7
辛|tân|cay|7
辰|thần|nhật nguyệt tinh|7
辵 辶|sước|chợt đi chợt dừng|7
邑 阝|ấp|vùng đất (阝 bên phải)|7
酉|dậu|bình rượu|7
釆|biện|phân biệt|7
里|lý|dặm, làng|7
金 钅|kim|kim loại|8
長 长|trường|dài|8
門 门|môn|cửa hai cánh|8
阜 阝|phụ|gò đất (阝 bên trái)|8
隶|đãi|kịp, theo|8
隹|chuy|chim đuôi ngắn|8
雨|vũ|mưa|8
青|thanh|màu xanh|8
非|phi|không phải|8
面|diện|mặt|9
革|cách|da thú|9
韋 韦|vi|da đã thuộc|9
韭|cửu|rau hẹ|9
音|âm|âm thanh|9
頁 页|hiệt|đầu; trang|9
風 风|phong|gió|9
飛 飞|phi|bay|9
食 饣|thực|ăn|9
首|thủ|cái đầu|9
香|hương|mùi thơm|9
馬 马|mã|con ngựa|10
骨|cốt|xương|10
高|cao|cao|10
髟|bưu|tóc dài|10
鬥|đấu|đánh nhau|10
鬯|sưởng|rượu nếp|10
鬲|cách|cái đỉnh|10
鬼|quỷ|ma quỷ|10
魚 鱼|ngư|con cá|11
鳥 鸟|điểu|con chim|11
鹵|lỗ|đất mặn|11
鹿|lộc|con hươu|11
麥 麦|mạch|lúa mạch|11
麻|ma|cây gai|11
黃 黄|hoàng|màu vàng|12
黍|thử|lúa nếp|12
黑|hắc|màu đen|12
黹|chỉ|may vá|12
黽|mãnh|con ếch|13
鼎|đỉnh|cái đỉnh|13
鼓|cổ|cái trống|13
鼠|thử|con chuột|13
鼻|tỵ|cái mũi|14
齊 齐|tề|ngang bằng|14
齒 齿|xỉ|răng|15
龍 龙|long|con rồng|16
龜 龟|quy|con rùa|16
龠|dược|sáo ba lỗ|17`;

/* ===== Lượng từ ===== */
window.MEASURE = [
  ['个','gè','Lượng từ chung, dùng cho người và nhiều đồ vật','一个人 · 三个苹果'],
  ['本','běn','Sách, vở','一本书 · 两本本子'],
  ['口','kǒu','Số người trong gia đình','我家有四口人'],
  ['块','kuài','Miếng; đồng tiền (khẩu ngữ)','一块面包 · 十块钱'],
  ['杯','bēi','Cốc, ly (đồ uống)','一杯茶 · 两杯水'],
  ['次','cì','Số lần','去过两次'],
  ['张','zhāng','Vật mỏng, phẳng: giấy, vé, bàn, giường','一张票 · 一张桌子'],
  ['件','jiàn','Quần áo (áo), sự việc','一件衣服 · 一件事'],
  ['位','wèi','Người (lịch sự)','一位老师'],
  ['只','zhī','Con vật nhỏ; một chiếc (trong đôi)','一只猫 · 一只手'],
  ['条','tiáo','Vật dài, mềm: đường, sông, cá, quần','一条路 · 一条鱼'],
  ['辆','liàng','Xe cộ','一辆汽车'],
  ['家','jiā','Cửa hàng, công ty, nhà hàng','一家饭店 · 一家商店'],
  ['双','shuāng','Đôi','一双鞋'],
  ['碗','wǎn','Bát (đồ ăn)','一碗米饭'],
  ['岁','suì','Tuổi','我二十岁'],
  ['点','diǎn','Giờ (trên đồng hồ)','八点'],
  ['页','yè','Trang','第十页'],
  ['间','jiān','Phòng, gian','一间房间'],
  ['些','xiē','Một vài (số lượng không xác định)','一些东西']
];

/* ===== Ngữ pháp HSK 1 =====
   q: [câu có ___ , [đáp án đúng, sai, sai...], nghĩa] */
window.GRAMMAR = [
  {t:'Câu chữ 是', f:'A + 是 + B', d:'Dùng để nói "A là B". Phủ định thêm 不 trước 是: A + 不是 + B.', ex:[['这是我的。','Cái này là của tôi.'],['那不是你的。','Cái kia không phải của bạn.']],
   q:[['这___我的。',['是','有','很'],'Cái này là của tôi.'],['那不___你的。',['是','很','有'],'Cái kia không phải của bạn.']]},
  {t:'Câu hỏi với 吗', f:'Câu trần thuật + 吗？', d:'Thêm 吗 vào cuối câu để thành câu hỏi có/không. Không đổi thứ tự từ.', ex:[['你好吗？','Bạn khỏe không?'],['是你吗？','Là bạn à?']],
   q:[['你好___？',['吗','呢','的'],'Bạn khỏe không?'],['是他___？',['吗','呢','也'],'Là anh ấy à?']]},
  {t:'Hỏi lại với 呢', f:'Danh từ / Đại từ + 呢？', d:'"Còn … thì sao?" Dùng để hỏi lại cùng một ý, không cần nhắc lại cả câu.', ex:[['我很好，你呢？','Tôi khỏe, còn bạn?'],['我也很好，他呢？','Tôi cũng khỏe, còn anh ấy?']],
   q:[['我很好，你___？',['呢','吗','也'],'Tôi khỏe, còn bạn?']]},
  {t:'Tính từ làm vị ngữ với 很', f:'Chủ ngữ + 很 + Tính từ', d:'Tính từ đứng ngay sau chủ ngữ, thường có 很 đi kèm, không dùng 是. 很 ở đây nhiều khi chỉ để câu tự nhiên, không nhất thiết nghĩa là "rất".', ex:[['我很好。','Tôi khỏe.'],['他们也很好。','Họ cũng khỏe.']],
   q:[['你们___好。',['很','是','吗'],'Các bạn khỏe.'],['我也___好。',['很','是','的'],'Tôi cũng khỏe.']]},
  {t:'Phủ định 不 và 没有', f:'不 + động từ/tính từ · 没有 + danh từ/động từ', d:'不 phủ định hiện tại, tương lai, thói quen, và phủ định 是. 没(有) phủ định 有 và việc đã xảy ra (sẽ học 没 ở bài 20).', ex:[['他不是我哥哥。','Anh ấy không phải anh trai tôi.'],['我没有姐姐。','Tôi không có chị gái.']],
   q:[['我___哥哥。',['没有','不是','很'],'Tôi không có anh trai.'],['他___是我哥哥。',['不','没有','了'],'Anh ấy không phải anh trai tôi.']]},
  {t:'Sở hữu với 的', f:'Người/Vật + 的 + Danh từ', d:'"của". Cái được sở hữu đứng sau, ngược với tiếng Việt. Với người thân, bạn bè có thể bỏ 的: 我妈妈.', ex:[['这是我的。','Cái này là của tôi.'],['那是谁的？','Cái kia là của ai?']],
   q:[['这是你___。',['的','了','吗'],'Cái này là của bạn.']]},
  {t:'Vị trí với 在', f:'Người/Vật + 在 + Nơi chốn', d:'"ở". Hỏi vị trí: …在哪儿？', ex:[['爸爸在哪儿？','Bố ở đâu?'],['妈妈也在。','Mẹ cũng ở đây.']],
   q:[['妈妈___哪儿？',['在','是','有'],'Mẹ ở đâu?']]},
  {t:'Câu chữ 有', f:'A + 有 + B', d:'"có" (sở hữu). Phủ định chỉ dùng 没有, không dùng 不有. Sau này học thêm: Nơi chốn + 有 + Vật ("ở đâu có gì").', ex:[['我有一个妹妹。','Tôi có một em gái.'],['你有哥哥吗？','Bạn có anh trai không?']],
   q:[['我___一个妹妹。',['有','是','在'],'Tôi có một em gái.']]},
  {t:'Thứ tự trong câu', f:'Chủ ngữ + Thời gian + Nơi chốn + Động từ', d:'Thời gian và nơi chốn đứng trước động từ, khác với tiếng Việt.', ex:[['我今天在学校学习。','Hôm nay tôi học ở trường.'],['我们下午在学校上课。','Buổi chiều chúng tôi học ở trường.']],
   q:[['Câu nào đúng?',['我明天在学校学习。','我在学校学习明天。','在学校我学习明天。'],'Ngày mai tôi học ở trường.']]},
  {t:'Trợ từ 了', f:'Động từ + 了 / Câu + 了', d:'Báo hiệu tình huống đã thay đổi ("rồi"), hoặc việc đã hoàn thành.', ex:[['我十岁了。','Tôi mười tuổi rồi.'],['我有两个了。','Tôi có hai cái rồi.']],
   q:[['我十岁___。',['了','的','吗'],'Tôi mười tuổi rồi.']]},
  {t:'Động từ năng nguyện', f:'想 / 要 / 会 / 能 + Động từ', d:'想: muốn · 要: cần, sẽ · 会: biết (học mà biết), sẽ · 能: có thể (có khả năng, điều kiện).', ex:[['我想喝水。','Tôi muốn uống nước.'],['我会说汉语。','Tôi biết nói tiếng Hán.']],
   q:[['我___开车。(biết lái)',['会','想','在'],'Tôi biết lái xe.'],['我___吃米饭。(muốn ăn)',['想','会','是'],'Tôi muốn ăn cơm.']]},
  {t:'Hỏi số lượng: 几 và 多少', f:'几 + lượng từ (dưới 10) · 多少 (số lớn)', d:'几 dùng khi số dự đoán nhỏ, bắt buộc có lượng từ. 多少 dùng cho số lớn, có thể bỏ lượng từ.', ex:[['你有几个哥哥？','Bạn có mấy anh trai?'],['这个多少块？','Cái này bao nhiêu đồng?']],
   q:[['你有___个哥哥？',['几','多少','什么'],'Bạn có mấy anh trai?']]},
  {t:'Câu hỏi chính phản', f:'Động từ + 不 + Động từ', d:'Lặp lại động từ/tính từ ở dạng khẳng định và phủ định để hỏi, không dùng 吗. Với 有 thì dùng 有没有.', ex:[['你好不好？','Bạn có khỏe không?'],['他是不是你哥哥？','Anh ấy có phải anh trai bạn không?']],
   q:[['你好___好？',['不','没有','吗'],'Bạn có khỏe không?']]},
  {t:'太…了', f:'太 + Tính từ + 了', d:'"… quá". Dùng để cảm thán, thường mang ý quá mức.', ex:[['太好了！','Tốt quá!'],['太多了！','Nhiều quá!']],
   q:[['太好___！',['了','的','吗'],'Tốt quá!']]},
  {t:'Đang làm: 在 / 正在 … 呢', f:'Chủ ngữ + 在 + Động từ + (呢)', d:'Diễn tả hành động đang diễn ra. Có thể nói 正在 thay cho 在 (sẽ học ở bài 20).', ex:[['我在吃饭呢。','Tôi đang ăn cơm.'],['妈妈在喝茶。','Mẹ đang uống trà.']],
   q:[['妈妈___吃饭呢。',['在','是','有'],'Mẹ đang ăn cơm.']]},
  {t:'So sánh với 比', f:'A + 比 + B + Tính từ', d:'"A … hơn B". Không dùng 很 trước tính từ.', ex:[['哥哥比我高。','Anh trai cao hơn tôi.'],['今天比昨天冷。','Hôm nay lạnh hơn hôm qua.']],
   q:[['他___我忙。',['比','跟','和'],'Anh ấy bận hơn tôi.']]}
];

/* ===== Hội thoại ===== [người, câu (từ cách nhau), pinyin, nghĩa] */
window.DIALOGS = [
  {t:'Làm quen', hz:'认识', lines:[
    ['A','你 好！','nǐ hǎo!','Xin chào!'],
    ['B','你 好！ 你 叫 什么 名字？','nǐ hǎo! nǐ jiào shénme míngzi?','Chào bạn! Bạn tên là gì?'],
    ['A','我 叫 小 文。 你 呢？','wǒ jiào Xiǎo Wén. nǐ ne?','Mình tên Tiểu Văn. Còn bạn?'],
    ['B','我 叫 大 明。 你 是 哪 国 人？','wǒ jiào Dà Míng. nǐ shì nǎ guó rén?','Mình tên Đại Minh. Bạn là người nước nào?'],
    ['A','我 是 越南 人。','wǒ shì Yuènán rén.','Mình là người Việt Nam.'],
    ['B','认识 你 很 高兴！','rènshi nǐ hěn gāoxìng!','Rất vui được quen bạn!']]},
  {t:'Hỏi thăm sức khỏe', hz:'你好吗', lines:[
    ['A','老师， 您 好！','lǎoshī, nín hǎo!','Em chào thầy!'],
    ['B','你 好！ 最近 身体 好 吗？','nǐ hǎo! zuìjìn shēntǐ hǎo ma?','Chào em! Dạo này em khỏe không?'],
    ['A','很 好， 谢谢！ 您 呢？','hěn hǎo, xièxie! nín ne?','Em khỏe, cảm ơn thầy! Còn thầy?'],
    ['B','我 也 很 好。 你 去 哪儿？','wǒ yě hěn hǎo. nǐ qù nǎr?','Thầy cũng khỏe. Em đi đâu đấy?'],
    ['A','我 去 图书馆。 再见！','wǒ qù túshūguǎn. zàijiàn!','Em đến thư viện. Em chào thầy!']]},
  {t:'Gia đình', hz:'家人', lines:[
    ['A','你 家 有 几 口 人？','nǐ jiā yǒu jǐ kǒu rén?','Nhà bạn có mấy người?'],
    ['B','我 家 有 四 口 人： 爸爸、 妈妈、 姐姐 和 我。','wǒ jiā yǒu sì kǒu rén: bàba, māma, jiějie hé wǒ.','Nhà mình có bốn người: bố, mẹ, chị gái và mình.'],
    ['A','你 姐姐 做 什么 工作？','nǐ jiějie zuò shénme gōngzuò?','Chị bạn làm nghề gì?'],
    ['B','她 是 医生。 你 有 哥哥 吗？','tā shì yīshēng. nǐ yǒu gēge ma?','Chị ấy là bác sĩ. Bạn có anh trai không?'],
    ['A','没有， 我 有 一 个 弟弟。','méiyǒu, wǒ yǒu yí ge dìdi.','Không, mình có một em trai.']]},
  {t:'Gọi món', hz:'吃饭', lines:[
    ['A','你好， 你们 要 吃 什么？','nǐ hǎo, nǐmen yào chī shénme?','Chào anh chị, anh chị muốn ăn gì?'],
    ['B','我 要 一 碗 米饭 和 一 个 鸡蛋。','wǒ yào yì wǎn mǐfàn hé yí ge jīdàn.','Tôi muốn một bát cơm và một quả trứng.'],
    ['A','喝 什么？ 茶 还是 水？','hē shénme? chá háishi shuǐ?','Uống gì ạ? Trà hay nước?'],
    ['B','一 杯 茶， 谢谢。 一共 多少 钱？','yì bēi chá, xièxie. yígòng duōshao qián?','Một cốc trà, cảm ơn. Tổng cộng bao nhiêu tiền?'],
    ['A','三十 块。','sānshí kuài.','Ba mươi tệ.']]},
  {t:'Mua sắm', hz:'买东西', lines:[
    ['A','这 件 衣服 多少 钱？','zhè jiàn yīfu duōshao qián?','Bộ quần áo này bao nhiêu tiền?'],
    ['B','两百 块。','liǎngbǎi kuài.','Hai trăm tệ.'],
    ['A','太 贵 了！ 一百 行 不 行？','tài guì le! yìbǎi xíng bu xíng?','Đắt quá! Một trăm được không?'],
    ['B','不 行， 一百五。','bù xíng, yìbǎi wǔ.','Không được, một trăm rưỡi.'],
    ['A','好 吧， 我 买 了。','hǎo ba, wǒ mǎi le.','Thôi được, tôi mua.']]},
  {t:'Hỏi đường', hz:'问路', lines:[
    ['A','请问， 医院 在 哪儿？','qǐngwèn, yīyuàn zài nǎr?','Xin hỏi, bệnh viện ở đâu?'],
    ['B','在 前边， 学校 旁边。','zài qiánbian, xuéxiào pángbiān.','Ở phía trước, cạnh trường học.'],
    ['A','远 不 远？','yuǎn bu yuǎn?','Có xa không?'],
    ['B','不 远， 走路 十 分钟。','bù yuǎn, zǒulù shí fēnzhōng.','Không xa, đi bộ mười phút.'],
    ['A','谢谢 你！','xièxie nǐ!','Cảm ơn bạn!'],
    ['B','不 客气。','bú kèqi.','Không có gì.']]},
  {t:'Hẹn gặp', hz:'见面', lines:[
    ['A','明天 你 有 时间 吗？','míngtiān nǐ yǒu shíjiān ma?','Ngày mai bạn có rảnh không?'],
    ['B','上午 有 课， 下午 没 事儿。','shàngwǔ yǒu kè, xiàwǔ méi shìr.','Buổi sáng có tiết, buổi chiều rảnh.'],
    ['A','我们 一起 去 看 电影， 好 吗？','wǒmen yìqǐ qù kàn diànyǐng, hǎo ma?','Chúng ta cùng đi xem phim nhé?'],
    ['B','好 啊！ 几 点 见面？','hǎo a! jǐ diǎn jiànmiàn?','Hay đấy! Mấy giờ gặp nhau?'],
    ['A','下午 三 点， 电影院 门口 见。','xiàwǔ sān diǎn, diànyǐngyuàn ménkǒu jiàn.','Ba giờ chiều, gặp ở cửa rạp phim.']]},
  {t:'Thời tiết', hz:'天气', lines:[
    ['A','今天 天气 怎么样？','jīntiān tiānqì zěnmeyàng?','Hôm nay thời tiết thế nào?'],
    ['B','很 冷， 外边 风 很 大。','hěn lěng, wàibian fēng hěn dà.','Rất lạnh, bên ngoài gió to lắm.'],
    ['A','明天 呢？','míngtiān ne?','Còn ngày mai?'],
    ['B','明天 会 下雨。','míngtiān huì xiàyǔ.','Ngày mai sẽ mưa.'],
    ['A','那 我 明天 在 家 休息。','nà wǒ míngtiān zài jiā xiūxi.','Vậy mai mình ở nhà nghỉ.']]},
  {t:'Đi khám bệnh', hz:'看病', lines:[
    ['A','你 怎么 了？','nǐ zěnme le?','Bạn sao vậy?'],
    ['B','我 生病 了， 身体 不 舒服。','wǒ shēngbìng le, shēntǐ bù shūfu.','Mình ốm rồi, người không khỏe.'],
    ['A','你 去 医院 看病 吧。','nǐ qù yīyuàn kànbìng ba.','Bạn đi bệnh viện khám đi.'],
    ['B','好， 我 明天 请假。','hǎo, wǒ míngtiān qǐngjià.','Ừ, mai mình xin nghỉ.'],
    ['A','多 喝 水， 多 休息。','duō hē shuǐ, duō xiūxi.','Uống nhiều nước, nghỉ ngơi nhiều nhé.']]},
  {t:'Ở trường', hz:'上课', lines:[
    ['A','你 每 天 几 点 上课？','nǐ měi tiān jǐ diǎn shàngkè?','Mỗi ngày bạn vào học lúc mấy giờ?'],
    ['B','八 点 上课， 十二 点 下课。','bā diǎn shàngkè, shí\'èr diǎn xiàkè.','Tám giờ vào học, mười hai giờ tan.'],
    ['A','汉语 难 不 难？','Hànyǔ nán bu nán?','Tiếng Hán có khó không?'],
    ['B','汉字 有 一点儿 难， 但是 很 有意思。','Hànzì yǒu yìdiǎnr nán, dànshì hěn yǒu yìsi.','Chữ Hán hơi khó, nhưng rất thú vị.'],
    ['A','我们 一起 学习 吧！','wǒmen yìqǐ xuéxí ba!','Chúng ta cùng học nhé!']]}
];

/* chữ HSK 1 → bộ thủ (nguồn: complete-hsk-vocabulary) */
window.CHAR_RAD = "爱爫 八八 爸父 吧口 白白 百白 班王 半十 帮巾 包勹 杯木 北匕 本木 比比 别刂 病疒 不一 菜艹 茶艹 差工 常巾 唱口 车车 吃口 出凵 穿穴 床广 次欠 从人 错钅 打扌 大大 到刂 地土 的白 等⺮ 弟弓 第⺮ 点灬 电曰 东一 动力 都阝 读讠 对寸 多夕 饿饣 二二 饭饣 放攵 飞飞 分刀 风风 干十 高高 哥口 歌欠 个丨 给纟 跟足 关丷 贵贝 国囗 过辶 还辶 好女 号口 喝口 和口 很彳 后口 花艹 话讠 坏土 回囗 会人 几几 记讠 家宀 间门 见见 叫口 教攵 姐女 进辶 九乙 就尢 开廾 看目 考耂 渴氵 课讠 口口 块土 快忄 来木 老老 了亅 累糸 冷冫 里里 两一 零雨 六八 楼木 路足 妈女 吗口 买大 慢忄 忙忄 毛毛 没氵 妹女 门门 们亻 拿手 哪口 那阝 奶女 男田 南十 难又 呢口 能⺼ 你亻 年干 您心 女女 跑足 票示 七一 起走 前刂 钱钅 请讠 球王 去厶 热灬 人人 日日 肉肉 三一 山山 上一 少小 十十 事亅 试讠 是日 手手 书丨 树木 谁讠 水水 睡目 说讠 四囗 送辶 岁山 他亻 她女 太大 天大 听口 外夕 晚日 忘心 问门 我戈 五二 洗氵 西西 下一 先儿 想心 小小 笑⺮ 写冖 新斤 行行 学子 要覀 也乚 页页 一一 用用 有月 右口 雨雨 元儿 远辶 月月 再冂 在土 早日 站立 找扌 这辶 着目 真目 正止 中丨 重里 住亻 字子 子子 走走 最曰 左工 坐土 做亻";

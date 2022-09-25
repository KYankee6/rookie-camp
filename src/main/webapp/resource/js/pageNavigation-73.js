/*
    @ author : 이영주 2021-02-19
    @ menuDataList (메뉴명을 매칭시켜 해당 링크 정보를 취한다.)
    @ menuDataList rule => 뎁스 메뉴명 : ["page url값", "target값", "title값"]
    @ 신규페이지 추가시 menuDataList 에 뎁스별로 데이터 추가 + urlDataFormat 에 페이지 url 추가
*/
var menuDataList = {
    "pageDepth_1" : {
        "About Us" : ["/au/P_AU_ID_SM.do", "_self", ""],
        "상품/서비스" : ["/pd/P_PD_AI_SM.do", "_self", ""],
        "산업" : ["/sl/P_SL_FN_001.do", "_self", ""],
        "DX Insight" : ["/bt/P_BT_SM.do", "_self", ""],
        "고객지원" : ["/cs/P_CS_FQ_SC_001.do", "_self", ""],
        "개인정보처리방침" : ["/cs/privacy.do", "_self", ""],
        "DX Summit 2021" : ["/DX_Summit_2021.do", "_self", ""],
        "통합검색" : ["/sr/searchResult.do", "_self", ""]
    },
    "pageDepth_2" : {
        "KT Enterprise 소개" : ["/au/P_AU_ID_SM.do", "_self", ""],
        "MISSION" : ["/au/P_AU_MI_SM.do", "_self", ""],
        "인사말" : ["/au/P_AU_GR_SM.do", "_self", ""],
        "AI/BigData" : ["#none", "_self", ""],
        "인터넷/전용회선" : ["#none", "_self", ""],
        "모바일" : ["#none", "_self", ""],
        "통신" : ["#none", "_self", ""],
        "보안/안전 솔루션" : ["#none", "_self", ""],
        "비즈 솔루션" : ["#none", "_self", ""],
        "미디어/광고" : ["#none", "_self", ""],
        "금융" : ["/sl/P_SL_FN_001.do", "_self", ""],
        "제조" : ["/sl/P_SL_MF_001.do", "_self", ""],
        "물류" : ["/sl/P_SL_RT_001.do", "_self", ""],
        "의료" : ["/sl/P_SL_MD_001.do", "_self", ""],
        "공공/국방" : ["/sl/P_SL_PB_001.do", "_self", ""],
        "프랜차이즈" : ["/sl/P_SL_FC_001.do", "_self", ""],
        "전체" : ["/bt/P_BT_SM.do", "_self", ""],
        "DX Story" : ["/bt/P_BT_TI_LT_001.do", "_self", ""],
        "영상 갤러리" : ["/bt/P_BT_VG_LT_001.do", "_self", ""],
        /*"컨퍼런스" : ["/bt/P_BT_CF_LT_001.do", "_self", ""],*/
        "언론보도" : ["/bt/P_BT_MR_LT_001.do", "_self", ""],
        "컨퍼런스" : ["/bt/P_BT_CR_LT.do", "_self", ""],
        "검색결과" : ["/bt/P_BT_SR_001.do", "_self", ""],
        "자주하는 질문(FAQ)" : ["/cs/P_CS_FQ_SC_001.do", "_self", ""],
        "1:1 온라인 문의" : ["/cs/P_CS_CQ_001.do", "_self", ""],
        /*"서비스 이용 안내" : ["/cs/P_CS_SI_RE_001.do", "_self", ""],*/
        "브로슈어/신청서" : ["/cs/P_CS_SI_RE_001.do", "_self", ""],
        "브로슈어/신청서" : ["/cs/P_CS_SI_RE_002.do", "_self", ""],
        "공지사항" : ["/cs/P_CS_NT_LT_001.do", "_self", ""]
    },
    "pageDepth_3" : {
        "AI Contact Center" : ["/pd/P_PD_AI_CC_001.do", "_self", ""],
        "AI Space" : ["/pd/P_PD_AI_AS_SM.do", "_self", ""],
        "AI Robot" : ["/pd/P_PD_AI_RB_SM.do", "_self", ""],
        "AI Solution" : ["/pd/P_PD_AI_ID_SM.do", "_self", ""],
        "BigData" : ["/pd/P_PD_AI_BD_SM.do", "_self", ""],
        "기업인터넷" : ["/pd/P_PD_NW_CI_SM.do", "_self", ""],
        "전용회선" : ["/pd/P_PD_NW_DL_SM.do", "_self", ""],
        "일반인터넷" : ["/pd/P_PD_NW_GI_SM.do", "_self", ""],
        "글로벌데이터" : ["/pd/P_PD_NW_GD_001.do", "_self", ""],
        "매니지드" : ["/pd/P_PD_NW_MS_SM.do", "_self", ""],
        "법인폰" : ["/pd/P_PD_MB_BP_001.do", "_self", ""],
        "기업전용5G" : ["/pd/P_PD_MB_BF_SM.do", "_self", ""],
        "기업특화 서비스" : ["/pd/P_PD_MB_SL_SM.do", "_self", ""],
        "기업일반전화" : ["/pd/P_PD_CC_CT_SM.do", "_self", ""],
        "기업인터넷전화" : ["/pd/P_PD_CC_CI_SM.do", "_self", ""],
        "전화부가서비스" : ["/pd/P_PD_CC_TE_SM.do", "_self", ""],
        "지능망" : ["/pd/P_PD_CC_IN_SM.do", "_self", ""],
        "국제전화" : ["/pd/P_PD_CC_IT_SM.do", "_self", ""],
        "스마트메시지" : ["/pd/P_PD_CC_CM_SM.do", "_self", ""],
        "콜센터" : ["/pd/P_PD_CC_CS_SM.do", "_self", ""],
        "영상보안" : ["/pd/P_PD_SS_VS_SM.do", "_self", ""],
        "안전" : ["/pd/P_PD_SS_SF_SM.do", "_self", ""],
        "정보보안" : ["/pd/P_PD_SS_IS_SM.do", "_self", ""],
        "Document DX" : ["/pd/P_PD_BS_EP_SM.do", "_self", ""],
        "비즈메카EZ" : ["/pd/P_PD_BS_BM_001.do", "_self", ""],
        "에너지" : ["/pd/P_PD_BS_ES_SM.do", "_self", ""],
        "스마트공간" : ["/pd/P_PD_BS_SF_SM.do", "_self", ""],
        "가상공간" : ["/pd/P_PD_BS_VS_001.do", "_self", ""],
        "모빌리티" : ["/pd/P_PD_BS_TS_SM.do", "_self", ""],
        "환경" : ["/pd/P_PD_BS_AM_001.do", "_self", ""],
        "랜선에듀" : ["/pd/P_PD_BS_LE_001.do", "_self", ""],
        "결합/제휴" : ["/pd/P_PD_BS_CP_001.do", "_self", ""],
        "Real Cube" : ["/pd/P_PD_BS_RC_001.do", "_self", ""],
        /*"메타라운지" : ["/pd/P_PD_BS_ML_001.do", "_self", ""],*/
        "olleh tv LiveAD+" : ["/pd/P_PD_MD_AD_001.do", "_self", ""],
        "우리TV시리즈" : ["/pd/P_PD_MD_WT_SM.do", "_self", ""],
        "olleh tv UHD Biz" : ["/pd/P_PD_MD_UB_001.do", "_self", ""],
        /*"브로슈어/신청서" : ["/cs/P_CS_SI_RE_001.do", "_self", ""],*/
        "통화 및 속도 품질" : ["https://speed.kt.com/speed/speedtest/introduce.asp", "_self", ""]
    },
    "pageDepth_4" : {
        "AI 아파트" : ["/pd/P_PD_AI_AS_001.do", "_self", ""],
        "AI 주택형 솔루션" : ["/pd/P_PD_AI_AS_002.do", "_self", ""],
        "AI 호텔" : ["/pd/P_PD_AI_AS_003.do", "_self", ""],
        "AI 케어 서비스" : ["/pd/P_PD_AI_AS_005.do", "_self", ""],
        "AI 호텔로봇" : ["/pd/P_PD_AI_RB_001.do", "_self", ""],
        "AI 뉴바리스타 로봇" : ["/pd/P_PD_AI_RB_002.do", "_self", ""],
        "AI 케어로봇 시니어" : ["/pd/P_PD_AI_RB_003.do", "_self", ""],
        "AI 서비스로봇" : ["/pd/P_PD_AI_RB_004.do", "_self", ""],
        "AI 방역로봇" : ["/pd/P_PD_AI_RB_005.do", "_self", ""],
        "스마트팩토리 Cobot" : ["/pd/P_PD_AI_RB_006.do", "_self", ""],
        "스마트팩토리 Vision" : ["/pd/P_PD_AI_RB_007.do", "_self", ""],
        "기가지니 인사이드" : ["/pd/P_PD_AI_ID_004.do", "_self", ""],
        "AI 코딩" : ["/pd/P_PD_AI_ID_005.do", "_self", ""],
        "GiGA office" : ["/pd/P_PD_NW_CI_001.do", "_self", ""],
        "Kornet" : ["/pd/P_PD_NW_CI_002.do", "_self", ""],
        "VPN" : ["/pd/P_PD_NW_CI_003.do", "_self", ""],
        "Flexline" : ["/pd/P_PD_NW_CI_004.do", "_self", ""],
        "국내전용회선" : ["/pd/P_PD_NW_DL_001.do", "_self", ""],
        "방송전용회선" : ["/pd/P_PD_NW_DL_002.do", "_self", ""],
        "CCTV전용회선" : ["/pd/P_PD_NW_DL_003.do", "_self", ""],
        "일반인터넷" : ["/pd/P_PD_NW_GI_001.do", "_self", ""],
        "인터넷 와이파이" : ["/pd/P_PD_NW_GI_002.do", "_self", ""],
        "오피스넷" : ["/pd/P_PD_NW_GI_003.do", "_self", ""],
        "오피스넷 보안와이파이" : ["/pd/P_PD_NW_GI_004.do", "_self", ""],
        "오피스넷 와이파이" : ["/pd/P_PD_NW_GI_005.do", "_self", ""],
        "포스넷" : ["/pd/P_PD_NW_GI_006.do", "_self", ""],
        "매니지드 ON" : ["/pd/P_PD_NW_MS_001.do", "_self", ""],
        "매니지드 스위치&라우터" : ["/pd/P_PD_NW_MS_002.do", "_self", ""],
        "매니지드  Wi-Fi" : ["/pd/P_PD_NW_MS_003.do", "_self", ""],
        "매니지드 통화장비" : ["/pd/P_PD_NW_MS_004.do", "_self", ""],
        "매니지드 서버" : ["/pd/P_PD_NW_MS_005.do", "_self", ""],
        "기업전용5G 속도선택부가서비스" : ["/pd/P_PD_MB_BF_001.do", "_self", ""],
        "기업전용 음성총량" : ["/pd/P_PD_MB_BF_002.do", "_self", ""],
        "기업전용 로밍" : ["/pd/P_PD_MB_BF_003.do", "_self", ""],
        "기업전용톡" : ["/pd/P_PD_MB_SL_001.do", "_self", ""],
        "법인마케팅 서비스" : ["/pd/P_PD_MB_SL_003.do", "_self", ""],
        "비즈데이터" : ["/pd/P_PD_MB_SL_004.do", "_self", ""],
        "랑톡" : ["/pd/P_PD_MB_SL_005.do", "_self", ""],
        "마이오피스" : ["/pd/P_PD_MB_SL_006.do", "_self", ""],
        "순Biz data 2종" : ["/pd/P_PD_MB_SL_007.do", "_self", ""],
        "비즈멤버십" : ["/pd/P_PD_MB_SL_008.do", "_self", ""],
        "법인명의 본인확인 서비스" : ["/pd/P_PD_MB_SL_009.do", "_self", ""],
        "Enterprise IoT" : ["/pd/P_PD_MB_SL_010.do", "_self", ""],
        "기업구내전화" : ["/pd/P_PD_CC_CT_001.do", "_self", ""],
        "이너텔" : ["/pd/P_PD_CC_CT_002.do", "_self", ""],
        "기업인터넷전화 Centrex" : ["/pd/P_PD_CC_CI_001.do", "_self", ""],
        "기업인터넷전화 설치형" : ["/pd/P_PD_CC_CI_002.do", "_self", ""],
        "링고비즈" : ["/pd/P_PD_CC_TE_005.do", "_self", ""],
        "발신정보알리미" : ["/pd/P_PD_CC_TE_006.do", "_self", ""],
        "전국대표번호" : ["/pd/P_PD_CC_IN_001.do", "_self", ""],
        "수신자부담 080" : ["/pd/P_PD_CC_IN_002.do", "_self", ""],
        "수신자부담 전국대표번호 14YY" : ["/pd/P_PD_CC_IN_003.do", "_self", ""],
        "안심번호 0502" : ["/pd/P_PD_CC_IN_004.do", "_self", ""],
        "콜체크인" : ["/pd/P_PD_CC_IN_005.do", "_self", ""],
        "전화정보 060" : ["/pd/P_PD_CC_IN_006.do", "_self", ""],
        "스마트 헌금콜" : ["/pd/P_PD_CC_IN_007.do", "_self", ""],
        "글로벌 메시징" : ["/pd/P_PD_CC_IT_003.do", "_self", ""],
        "국제 클로버 서비스" : ["/pd/P_PD_CC_IT_004.do", "_self", ""],
        "스마트메시지 Plus" : ["/pd/P_PD_CC_CM_001.do", "_self", ""],
        "스마트메시지 WEB/POP/PRO/API/biz" : ["/pd/P_PD_CC_CM_002.do", "_self", ""],
        "스마트메시지 RCS" : ["/pd/P_PD_CC_CM_003.do", "_self", ""],
        "양방향 문자" : ["/pd/P_PD_CC_CM_006.do", "_self", ""],
        "위치문자" : ["/pd/P_PD_CC_CM_007.do", "_self", ""],
        "가게정보알림메시지(소상공인형)" : ["/pd/P_PD_CC_CM_005.do", "_self", ""],
        "공인알림문자" : ["/pd/P_PD_CC_CM_008.do", "_self", ""],
        "콜센터 커스텀" : ["/pd/P_PD_CC_CS_003.do", "_self", ""],
        "콜센터 커스텀 Pro" : ["/pd/P_PD_CC_CS_004.do", "_self", ""],
        "콜센터 클라우드 비즈" : ["/pd/P_PD_CC_CS_001.do", "_self", ""],
        "콜센터 클라우드 옴니" : ["/pd/P_PD_CC_CS_002.do", "_self", ""],
        "GiGAeyes i-slim/i-view" : ["/pd/P_PD_SS_VS_001.do", "_self", ""],
        "GiGAeyes i-special" : ["/pd/P_PD_SS_VS_002.do", "_self", ""],
        "GiGAeyes i-pass" : ["/pd/P_PD_SS_VS_003.do", "_self", ""],
        "GiGAeyes i-guard" : ["/pd/P_PD_SS_VS_004.do", "_self", ""],
        "GiGAeyes i-guard premium" : ["/pd/P_PD_SS_VS_005.do", "_self", ""],
        "GiGAeyes Pro" : ["/pd/P_PD_SS_VS_006.do", "_self", ""],
        "SafeMate 화재서비스" : ["/pd/P_PD_SS_SF_001.do", "_self", ""],
        "SafeMate 방범서비스" : ["/pd/P_PD_SS_SF_002.do", "_self", ""],
        "SafetyOne" : ["/pd/P_PD_SS_SF_003.do", "_self", ""],
        "SafeNet" : ["/pd/P_PD_SS_IS_001.do", "_self", ""],
        "Secure UTM" : ["/pd/P_PD_SS_IS_002.do", "_self", ""],
        "Secure gate" : ["/pd/P_PD_SS_IS_003.do", "_self", ""],
        "Secure WiFi" : ["/pd/P_PD_SS_IS_004.do", "_self", ""],
        "지능형 위협메일 분석" : ["/pd/P_PD_SS_IS_005.do", "_self", ""],
        "클린존" : ["/pd/P_PD_SS_IS_006.do", "_self", ""],
        "Paperless 플랫폼" : ["/pd/P_PD_BS_EP_001.do", "_self", ""],
        "공인전자문서센터" : ["/pd/P_PD_BS_EP_003.do", "_self", ""],
        "GiGA energy manager" : ["/pd/P_PD_BS_ES_001.do", "_self", ""],
        "GiGA energy DR" : ["/pd/P_PD_BS_ES_002.do", "_self", ""],
        "GiGA energy trade" : ["/pd/P_PD_BS_ES_006.do", "_self", ""],
        "공간컨텐츠관리솔루션(CMS)" : ["/pd/P_PD_BS_SF_001.do", "_self", ""],
        "Real Cube" : ["/pd/P_PD_BS_VS_001.do", "_self", ""],
        "정밀측위" : ["/pd/P_PD_BS_TS_001.do", "_self", ""],
        "자율주행 로봇" : ["/pd/P_PD_BS_TS_002.do", "_self", ""],
        "GIS" : ["/pd/P_PD_BS_TS_003.do", "_self", ""],
        "AI교통영상분석솔루션" : ["/pd/P_PD_BS_TS_004.do", "_self", ""],
        "DTG/법인차량 관제" : ["/pd/P_PD_BS_TS_005.do", "_self", ""],
        "EV 차량관제" : ["/pd/P_PD_BS_TS_006.do", "_self", ""],
        "EV 바이크 관제" : ["/pd/P_PD_BS_TS_007.do", "_self", ""],
        "Air Map" : ["/pd/P_PD_BS_EN_001.do", "_self", ""],
        "비즈성공팩" : ["/pd/P_PD_BS_CP_001.do", "_self", ""],
        "주소변경 사업 제휴" : ["/pd/P_PD_BS_CP_002.do", "_self", ""],
        "우리지자체 tv" : ["/pd/P_PD_MD_WT_001.do", "_self", ""],
        "우리소방/경찰서 tv" : ["/pd/P_PD_MD_WT_002.do", "_self", ""],
        "우리병원 tv" : ["/pd/P_PD_MD_WT_003.do", "_self", ""],
        "우리조합 tv" : ["/pd/P_PD_MD_WT_004.do", "_self", ""],
        "080콜체크인 상담신청" : ["/cs/080cs.do", "_self", ""],
        "모바일 상담신청" : ["/cs/P_CS_CQ_002.do", "_self", ""],
        "온라인 문의" : ["/cs/P_CS_CQ_003.do", "_self", ""],
        "온라인 문의 네이버블로그" : ["/cs/P_CS_CQ_004.do", "_self", ""],
        "온라인 문의 유튜브" : ["/cs/P_CS_CQ_005.do", "_self", ""],
    }
};

//page URL Data format
var urlDataFormat = {
    "au/P_AU_ID_SM" : ["About Us", "KT Enterprise 소개"],
    "au/P_AU_MI_SM" : ["About Us", "MISSION"],
    "au/P_AU_GR_SM" : ["About Us", "인사말"],
	"pd/P_PD_AI_SM" : ["상품/서비스", "AI/BigData"],
    "pd/P_PD_AI_CC_001" : ["상품/서비스", "AI/BigData", "AI Contact Center"],
    "pd/P_PD_AI_AS_SM" : ["상품/서비스", "AI/BigData", "AI Space"],
    "pd/P_PD_AI_AS_001" : ["상품/서비스", "AI/BigData", "AI Space", "AI 아파트"],
    "pd/P_PD_AI_AS_002" : ["상품/서비스", "AI/BigData", "AI Space", "AI 주택형 솔루션"],
    "pd/P_PD_AI_AS_003" : ["상품/서비스", "AI/BigData", "AI Space", "AI 호텔"],
    "pd/P_PD_AI_AS_005" : ["상품/서비스", "AI/BigData", "AI Space", "AI 케어 서비스"],
    "pd/P_PD_AI_RB_SM" : ["상품/서비스", "AI/BigData", "AI Robot"],
    "pd/P_PD_AI_RB_001" : ["상품/서비스", "AI/BigData", "AI Robot", "AI 호텔로봇"],
    "pd/P_PD_AI_RB_002" : ["상품/서비스", "AI/BigData", "AI Robot", "AI 뉴바리스타 로봇"],
    "pd/P_PD_AI_RB_003" : ["상품/서비스", "AI/BigData", "AI Robot", "AI 케어로봇 시니어"],
    "pd/P_PD_AI_RB_004" : ["상품/서비스", "AI/BigData", "AI Robot", "AI 서비스로봇"],
    "pd/P_PD_AI_RB_005" : ["상품/서비스", "AI/BigData", "AI Robot", "AI 방역로봇"],
    "pd/P_PD_AI_RB_006" : ["상품/서비스", "AI/BigData", "AI Robot", "스마트팩토리 Cobot"],
    "pd/P_PD_AI_RB_007" : ["상품/서비스", "AI/BigData", "AI Robot", "스마트팩토리 Vision"],
    "pd/P_PD_AI_ID_SM" : ["상품/서비스", "AI/BigData", "AI Solution"],
    "pd/P_PD_AI_ID_004" : ["상품/서비스", "AI/BigData", "AI Solution", "기가지니 인사이드"],
    "pd/P_PD_AI_ID_005" : ["상품/서비스", "AI/BigData", "AI Solution", "AI 코딩"],
    "pd/P_PD_AI_BD_SM" : ["상품/서비스", "AI/BigData", "BigData"],
    "pd/P_PD_AI_BD_001" : ["상품/서비스", "AI/BigData", "BigData", "관광분석솔루션(TrIP)"],
    "pd/P_PD_AI_BD_002" : ["상품/서비스", "AI/BigData", "BigData", "상권분석솔루션(GrIP)"],
    "pd/P_PD_AI_BD_003" : ["상품/서비스", "AI/BigData", "BigData", "생활인구솔루션(ALP)"],
	"pd/P_PD_AI_BD_004" : ["상품/서비스", "AI/BigData", "BigData", "타겟 마케팅(K-Ads)"],
    "pd/P_PD_AI_BD_005" : ["상품/서비스", "AI/BigData", "BigData", "마케팅코치"],
    "pd/P_PD_AI_BD_006" : ["상품/서비스", "AI/BigData", "BigData", "잘나가게"],
    "pd/P_PD_AI_BD_007" : ["상품/서비스", "AI/BigData", "BigData", "빅데이터 플랫폼"],
    "pd/P_PD_NW_SM" : ["상품/서비스", "인터넷/전용회선"],
    "pd/P_PD_NW_CI_SM" : ["상품/서비스", "인터넷/전용회선", "기업인터넷"],
    "pd/P_PD_NW_CI_001" : ["상품/서비스", "인터넷/전용회선", "기업인터넷", "GiGA office"],
    "pd/P_PD_NW_CI_002" : ["상품/서비스", "인터넷/전용회선", "기업인터넷", "Kornet"],
    "pd/P_PD_NW_CI_003" : ["상품/서비스", "인터넷/전용회선", "기업인터넷", "VPN"],
    "pd/P_PD_NW_CI_004" : ["상품/서비스", "인터넷/전용회선", "기업인터넷", "Flexline"],
    "pd/P_PD_NW_DL_SM" : ["상품/서비스", "인터넷/전용회선", "전용회선"],
    "pd/P_PD_NW_DL_001" : ["상품/서비스", "인터넷/전용회선", "전용회선", "국내전용회선"],
    "pd/P_PD_NW_DL_002" : ["상품/서비스", "인터넷/전용회선", "전용회선", "방송전용회선"],
    "pd/P_PD_NW_DL_003" : ["상품/서비스", "인터넷/전용회선", "전용회선", "CCTV전용회선"],
    "pd/P_PD_NW_GD_001" : ["상품/서비스", "인터넷/전용회선", "글로벌데이터"],
    "pd/P_PD_NW_GI_SM" : ["상품/서비스", "인터넷/전용회선", "일반인터넷"],
    "pd/P_PD_NW_GI_001" : ["상품/서비스", "인터넷/전용회선", "일반인터넷", "일반인터넷"],
    "pd/P_PD_NW_GI_002" : ["상품/서비스", "인터넷/전용회선", "일반인터넷", "인터넷 와이파이"],
    "pd/P_PD_NW_GI_003" : ["상품/서비스", "인터넷/전용회선", "일반인터넷", "오피스넷"],
    "pd/P_PD_NW_GI_004" : ["상품/서비스", "인터넷/전용회선", "일반인터넷", "오피스넷 보안와이파이"],
    "pd/P_PD_NW_GI_005" : ["상품/서비스", "인터넷/전용회선", "일반인터넷", "오피스넷 와이파이"],
    "pd/P_PD_NW_GI_006" : ["상품/서비스", "인터넷/전용회선", "일반인터넷", "포스넷"],
    "pd/P_PD_NW_MS_SM" : ["상품/서비스", "인터넷/전용회선", "매니지드"],
    "pd/P_PD_NW_MS_001" : ["상품/서비스", "인터넷/전용회선", "매니지드", "매니지드 ON"],
    "pd/P_PD_NW_MS_002" : ["상품/서비스", "인터넷/전용회선", "매니지드", "매니지드 스위치&라우터"],
    "pd/P_PD_NW_MS_003" : ["상품/서비스", "인터넷/전용회선", "매니지드", "매니지드 Wi-Fi"],
    "pd/P_PD_NW_MS_004" : ["상품/서비스", "인터넷/전용회선", "매니지드", "매니지드 통화장비"],
    "pd/P_PD_NW_MS_005" : ["상품/서비스", "인터넷/전용회선", "매니지드", "매니지드 서버"],
    "pd/P_PD_MB_SM" : ["상품/서비스", "모바일"],
    "pd/P_PD_MB_BP_001" : ["상품/서비스", "모바일", "법인폰"],
    "pd/P_PD_MB_BF_SM" : ["상품/서비스", "모바일", "기업전용5G"],
    "pd/P_PD_MB_BF_001" : ["상품/서비스", "모바일", "기업전용5G", "기업전용5G 속도선택부가서비스"],
    "pd/P_PD_MB_BF_002" : ["상품/서비스", "모바일", "기업전용5G", "기업전용 음성총량"],
    "pd/P_PD_MB_BF_003" : ["상품/서비스", "모바일", "기업전용5G", "기업전용 로밍"],
    "pd/P_PD_MB_SL_SM" : ["상품/서비스", "모바일", "기업특화 서비스"],
    "pd/P_PD_MB_SL_001" : ["상품/서비스", "모바일", "기업특화 서비스", "기업전용톡"],
    "pd/P_PD_MB_SL_003" : ["상품/서비스", "모바일", "기업특화 서비스", "법인마케팅 서비스"],
    "pd/P_PD_MB_SL_004" : ["상품/서비스", "모바일", "기업특화 서비스", "비즈데이터"],
    "pd/P_PD_MB_SL_005" : ["상품/서비스", "모바일", "기업특화 서비스", "랑톡"],
    "pd/P_PD_MB_SL_006" : ["상품/서비스", "모바일", "기업특화 서비스", "마이오피스"],
    "pd/P_PD_MB_SL_007" : ["상품/서비스", "모바일", "기업특화 서비스", "순Biz data 2종"],
    "pd/P_PD_MB_SL_008" : ["상품/서비스", "모바일", "기업특화 서비스", "비즈멤버십"],
    "pd/P_PD_MB_SL_009" : ["상품/서비스", "모바일", "기업특화 서비스", "법인명의 본인확인 서비스"],
    "pd/P_PD_MB_SL_010" : ["상품/서비스", "모바일", "기업특화 서비스", "Enterprise IoT"],    
    "pd/P_PD_CC_SM" : ["상품/서비스", "통신"],
    "pd/P_PD_CC_CT_SM" : ["상품/서비스", "통신", "기업일반전화"],
    "pd/P_PD_CC_CT_001" : ["상품/서비스", "통신", "기업일반전화", "기업구내전화"],
    "pd/P_PD_CC_CT_002" : ["상품/서비스", "통신", "기업일반전화", "이너텔"],
    "pd/P_PD_CC_CI_SM" : ["상품/서비스", "통신", "기업인터넷전화"],
    "pd/P_PD_CC_CI_001" : ["상품/서비스", "통신", "기업인터넷전화", "기업인터넷전화 Centrex"],
    "pd/P_PD_CC_CI_002" : ["상품/서비스", "통신", "기업인터넷전화", "기업인터넷전화 설치형"],
    "pd/P_PD_CC_TE_SM" : ["상품/서비스", "통신", "전화부가서비스"],
    "pd/P_PD_CC_TE_005" : ["상품/서비스", "통신", "전화부가서비스", "링고비즈"],
    "pd/P_PD_CC_TE_006" : ["상품/서비스", "통신", "전화부가서비스", "발신정보알리미"],
    "pd/P_PD_CC_IN_SM" : ["상품/서비스", "통신", "지능망"],
    "pd/P_PD_CC_IN_001" : ["상품/서비스", "통신", "지능망", "전국대표번호"],
    "pd/P_PD_CC_IN_002" : ["상품/서비스", "통신", "지능망", "수신자부담 080"],
    "pd/P_PD_CC_IN_003" : ["상품/서비스", "통신", "지능망", "수신자부담 전국대표번호 14YY"],
    "pd/P_PD_CC_IN_004" : ["상품/서비스", "통신", "지능망", "안심번호 0502"],
    "pd/P_PD_CC_IN_005" : ["상품/서비스", "통신", "지능망", "콜체크인"],
    "pd/P_PD_CC_IN_006" : ["상품/서비스", "통신", "지능망", "전화정보 060"],
    "pd/P_PD_CC_IN_007" : ["상품/서비스", "통신", "지능망", "스마트 헌금콜"],
    "pd/P_PD_CC_IT_SM" : ["상품/서비스", "통신", "국제전화"],
    "pd/P_PD_CC_IT_003" : ["상품/서비스", "통신", "국제전화", "글로벌 메시징"],
    "pd/P_PD_CC_IT_004" : ["상품/서비스", "통신", "국제전화", "국제 클로버 서비스"],
    "pd/P_PD_CC_CM_SM" : ["상품/서비스", "통신", "스마트메시지"],
    "pd/P_PD_CC_CM_001" : ["상품/서비스", "통신", "스마트메시지", "스마트메시지 Plus"],
    "pd/P_PD_CC_CM_002" : ["상품/서비스", "통신", "스마트메시지", "스마트메시지 WEB/POP/PRO/API/biz"],
    "pd/P_PD_CC_CM_003" : ["상품/서비스", "통신", "스마트메시지", "스마트메시지 RCS"],
    "pd/P_PD_CC_CM_006" : ["상품/서비스", "통신", "스마트메시지", "양방향 문자"],
    "pd/P_PD_CC_CM_007" : ["상품/서비스", "통신", "스마트메시지", "위치문자"],
    "pd/P_PD_CC_CM_005" : ["상품/서비스", "통신", "스마트메시지", "가게정보알림메시지(소상공인형)"],
    "pd/P_PD_CC_CM_008" : ["상품/서비스", "통신", "스마트메시지", "공인알림문자"],
    "pd/P_PD_CC_CS_SM" : ["상품/서비스", "통신", "콜센터"],
    "pd/P_PD_CC_CS_003" : ["상품/서비스", "통신", "콜센터", "콜센터 커스텀"],
    "pd/P_PD_CC_CS_004" : ["상품/서비스", "통신", "콜센터", "콜센터 커스텀 Pro"],
    "pd/P_PD_CC_CS_001" : ["상품/서비스", "통신", "콜센터", "콜센터 클라우드 비즈"],
    "pd/P_PD_CC_CS_002" : ["상품/서비스", "통신", "콜센터", "콜센터 클라우드 옴니"],
    "pd/P_PD_SS_SM" : ["상품/서비스", "보안/안전 솔루션"],
    "pd/P_PD_SS_VS_SM" : ["상품/서비스", "보안/안전 솔루션", "영상보안"],
    "pd/P_PD_SS_VS_001" : ["상품/서비스", "보안/안전 솔루션", "영상보안", "GiGAeyes i-slim/i-view"],
    "pd/P_PD_SS_VS_002" : ["상품/서비스", "보안/안전 솔루션", "영상보안", "GiGAeyes i-special"],
    "pd/P_PD_SS_VS_003" : ["상품/서비스", "보안/안전 솔루션", "영상보안", "GiGAeyes i-pass"],
    "pd/P_PD_SS_VS_004" : ["상품/서비스", "보안/안전 솔루션", "영상보안", "GiGAeyes i-guard"],
    "pd/P_PD_SS_VS_005" : ["상품/서비스", "보안/안전 솔루션", "영상보안", "GiGAeyes i-guard premium"],
    "pd/P_PD_SS_VS_006" : ["상품/서비스", "보안/안전 솔루션", "영상보안", "GiGAeyes Pro"],
    "pd/P_PD_SS_SF_SM" : ["상품/서비스", "보안/안전 솔루션", "안전"],
    "pd/P_PD_SS_SF_001" : ["상품/서비스", "보안/안전 솔루션", "안전", "SafeMate 화재서비스"],
    "pd/P_PD_SS_SF_002" : ["상품/서비스", "보안/안전 솔루션", "안전", "SafeMate 방범서비스"],
    "pd/P_PD_SS_SF_003" : ["상품/서비스", "보안/안전 솔루션", "안전", "SafetyOne"],
    "pd/P_PD_SS_IS_SM" : ["상품/서비스", "보안/안전 솔루션", "정보보안"],
    "pd/P_PD_SS_IS_001" : ["상품/서비스", "보안/안전 솔루션", "정보보안", "세이프넷(SafeNet)"],
    "pd/P_PD_SS_IS_002" : ["상품/서비스", "보안/안전 솔루션", "정보보안", "Secure UTM"],
    "pd/P_PD_SS_IS_003" : ["상품/서비스", "보안/안전 솔루션", "정보보안", "Secure gate"],
    "pd/P_PD_SS_IS_004" : ["상품/서비스", "보안/안전 솔루션", "정보보안", "Secure WiFi"],
    "pd/P_PD_SS_IS_005" : ["상품/서비스", "보안/안전 솔루션", "정보보안", "지능형 위협메일 분석"],
    "pd/P_PD_SS_IS_006" : ["상품/서비스", "보안/안전 솔루션", "정보보안", "클린존"],
    "pd/P_PD_BS_SM" : ["상품/서비스", "비즈 솔루션"],
    "pd/P_PD_BS_EP_SM" : ["상품/서비스", "비즈 솔루션", "Document DX"],
    "pd/P_PD_BS_EP_001" : ["상품/서비스", "비즈 솔루션", "Document DX", "Paperless 플랫폼"],
    "pd/P_PD_BS_EP_003" : ["상품/서비스", "비즈 솔루션", "Document DX", "공인전자문서센터"],
    "pd/P_PD_BS_SF_SM" : ["상품/서비스", "비즈 솔루션", "스마트공간"],
    "pd/P_PD_BS_SF_001" : ["상품/서비스", "비즈 솔루션", "스마트공간", "공간컨텐츠관리솔루션(CMS)"],
    "pd/P_PD_BS_TS_SM" : ["상품/서비스", "비즈 솔루션", "모빌리티"],
    "pd/P_PD_BS_TS_001" : ["상품/서비스", "비즈 솔루션", "모빌리티", "정밀측위"],
    "pd/P_PD_BS_TS_002" : ["상품/서비스", "비즈 솔루션", "모빌리티", "자율주행 셔틀"],
    "pd/P_PD_BS_TS_003" : ["상품/서비스", "비즈 솔루션", "모빌리티", "GIS"],
    "pd/P_PD_BS_TS_004" : ["상품/서비스", "비즈 솔루션", "모빌리티", "AI교통영상분석솔루션"],
    "pd/P_PD_BS_TS_005" : ["상품/서비스", "비즈 솔루션", "모빌리티", "DTG/법인차량 관제"],
    "pd/P_PD_BS_TS_006" : ["상품/서비스", "비즈 솔루션", "모빌리티", "EV 차량관제"],
    "pd/P_PD_BS_TS_007" : ["상품/서비스", "비즈 솔루션", "모빌리티", "EV 바이크 관제"],
    "pd/P_PD_BS_ES_SM" : ["상품/서비스", "비즈 솔루션", "에너지"],
    "pd/P_PD_BS_ES_001" : ["상품/서비스", "비즈 솔루션", "에너지", "GiGA energy manager"],
    "pd/P_PD_BS_ES_002" : ["상품/서비스", "비즈 솔루션", "에너지", "GiGA energy DR"],
    "pd/P_PD_BS_ES_006" : ["상품/서비스", "비즈 솔루션", "에너지", "GiGA energy trade"],
    "pd/P_PD_BS_EN_001" : ["상품/서비스", "비즈 솔루션", "환경", "Air Map"],
    "pd/P_PD_BS_LE_001" : ["상품/서비스", "비즈 솔루션", "랜선에듀"],
    "pd/P_PD_BS_CP_001" : ["상품/서비스", "비즈 솔루션", "결합/제휴", "비즈성공팩"],
    "pd/P_PD_BS_CP_002" : ["상품/서비스", "비즈 솔루션", "결합/제휴", "주소변경 사업 제휴"],
    "pd/P_PD_BS_BM_001" : ["상품/서비스", "비즈 솔루션", "비즈메카EZ"],
    "pd/P_PD_BS_VS_001" : ["상품/서비스", "비즈 솔루션", "가상공간", "Real Cube"],
    /*"pd/P_PD_BS_ML_001" : ["상품/서비스", "비즈 솔루션", "메타라운지"],*/
    "pd/P_PD_MD_SM" : ["상품/서비스", "미디어/광고"],
    "pd/P_PD_MD_AD_001" : ["상품/서비스", "미디어/광고", "olleh tv LiveAD+"],
    "pd/P_PD_MD_WT_SM" : ["상품/서비스", "미디어/광고", "우리TV시리즈"],
    "pd/P_PD_MD_UB_001" : ["상품/서비스", "미디어/광고", "olleh tv UHD Biz"],
    "pd/P_PD_MD_WT_001" : ["상품/서비스", "미디어/광고", "우리TV시리즈", "우리지자체 tv"],
    "pd/P_PD_MD_WT_002" : ["상품/서비스", "미디어/광고", "우리TV시리즈", "우리소방/경찰서 tv"],
    "pd/P_PD_MD_WT_003" : ["상품/서비스", "미디어/광고", "우리TV시리즈", "우리병원 tv"],
    "pd/P_PD_MD_WT_004" : ["상품/서비스", "미디어/광고", "우리TV시리즈", "우리조합 tv"],
    "sl/P_SL_AI_001" : ["산업", "AI를 통한 업무 생산성 향상"],
    "sl/P_SL_UB_001" : ["산업", "언택트"],
    "sl/P_SL_DI_001" : ["산업", "IT 인프라 최적화"],
    "sl/P_SL_FN_001" : ["산업", "금융"],
    "sl/P_SL_MF_001" : ["산업", "제조"],
    "sl/P_SL_RT_001" : ["산업", "물류"],
    "sl/P_SL_MD_001" : ["산업", "의료"],
    "sl/P_SL_PB_001" : ["산업", "공공/국방"],
    "sl/P_SL_FC_001" : ["산업", "프랜차이즈"],
    "bt/P_BT_SM" : ["DX Insight", "전체"],
    "bt/P_BT_TI_LT_001" : ["DX Insight", "DX Story"],
    "bt/P_BT_TI_VW_001" : ["DX Insight", "DX Story", "상세보기"],//상세페이지는 링크가 없어도 되므로, 별도로 3뎁스 데이터를 만들지 않음
    "bt/P_BT_VG_LT_001" : ["DX Insight", "영상 갤러리"],
    "bt/P_BT_VG_VW_001" : ["DX Insight", "영상 갤러리", "상세보기"],//상세페이지는 링크가 없어도 되므로, 별도로 3뎁스 데이터를 만들지 않음
    /*"bt/P_BT_CF_LT_001" : ["DX Insight", "컨퍼런스"],
    "bt/P_BT_CF_VW_001" : ["DX Insight", "컨퍼런스", "상세보기"],//상세페이지는 링크가 없어도 되므로, 별도로 3뎁스 데이터를 만들지 않음*/
    "bt/P_BT_MR_LT_001" : ["DX Insight", "언론보도"],
    "bt/P_BT_MR_VW_001" : ["DX Insight", "언론보도", "상세보기"],//상세페이지는 링크가 없어도 되므로, 별도로 3뎁스 데이터를 만들지 않음
    "bt/P_BT_CR_LT" : ["DX Insight", "컨퍼런스"],
    "bt/P_BT_CR_VW_001" : ["DX Insight", "컨퍼런스", "Digital-X Summit 2020"],
    "bt/P_BT_CR_VW_002" : ["DX Insight", "컨퍼런스", "Digital-X Summit 2021"],
    "bt/P_BT_CR_VW_003" : ["DX Insight", "컨퍼런스", "Digital-X Summit 2022"],
    "bt/P_BT_SR_001" : ["DX Insight", "검색결과"],//상세페이지는 링크가 없어도 되므로, 별도로 3뎁스 데이터를 만들지 않음
    "cs/P_CS_FQ_SC_001" : ["고객지원", "자주하는 질문(FAQ)"],
    "cs/P_CS_CQ_001" : ["고객지원", "1:1 온라인 문의"],
    /*"cs/P_CS_SI_RE_001" : ["고객지원", "서비스 이용 안내"],*/
    "cs/P_CS_SI_RE_001" : ["고객지원", "브로슈어/신청서"],
    "cs/P_CS_SI_RE_002" : ["고객지원", "브로슈어/신청서"],
    "https://speed.kt.com/speed/speedtest/introduce.asp" : ["고객지원", "서비스 이용 안내", "통화 및 속도 품질"],
    "cs/P_CS_NT_LT_001" : ["고객지원", "공지사항"],
    "cs/P_CS_NT_VW_001" : ["고객지원", "공지사항", "상세보기"],
    "cs/privacy" : ["개인정보처리방침"],
    "DX_Summit_2021" : ["DX Summit 2021"],
    "sr/searchResult" : ["통합검색"],
    "cs/080cs" : ["고객지원", "080"],
    "cs/P_CS_CQ_002" : ["고객지원", "온라인 문의"],
    "cs/AIRobot" : ["고객지원", "AI Robot 컨설팅 신청"],
    "cs/P_CS_CQ_003" : ["고객지원", "온라인 문의"],
    "cs/P_CS_CQ_004" : ["고객지원", "온라인 문의_네이버블로그"],
    "cs/P_CS_CQ_005" : ["고객지원", "온라인 문의_유튜브"],
}


//location bar 생성하고, 아이스크롤 이벤트 바인딩 하고, 화면에 append 까지 실행
$(document).ready(function(){
    //dom create
    var createDom = (function(){
        var dom,
            initModule,
            htmlWrapping,
            iScrollInit,
            iScrollinstance,
            iScrollReset,
            url = location.href.split("kt.com/")[1].split(".")[0],
            mypage = "",
            i = 0,
            timeout,
            resetTimeout,
            delay = 100,
            str = "<ul><li class=\"home\"><a href=\"/\"><span>HOME</span></a></li>";
    
        dom = (function(){
            return {
                "pc_subtab" : $(".kt_pc .sub_tab"),
                "mb_subtab" : $(".kt_mb .sub_tab"),
                "pc_container" : $(".kt_pc .container"),
                "mb_container" : $(".kt_mb .container"),
                "pc_topvisual" : $(".kt_pc .top_visual"),
                "mb_topvisual" : $(".kt_mb .top_visual")
            };
        })();
    
        initModule = function(){
            mypage = urlDataFormat[url];
            if(!mypage) return false;
            
            for(; i < mypage.length; i++){
                if(i != mypage.length - 1){//마지막 뎁스가 아닐때만 링크 처리
                    str += "<li><a href=\"" + menuDataList["pageDepth_" + (i + 1)][mypage[i]][0] + "\" target=\"" + menuDataList["pageDepth_" + (i + 1)][mypage[i]][1] + "\" title=\"" + menuDataList["pageDepth_" + (i + 1)][mypage[i]][2] + "\">" + mypage[i] + "</a></li>";
                }else{//마지막 뎁스일 경우 링크 없이 텍스트만 출력
                    str += "<li><span>" + mypage[i] +  "</span></li>";
                }
            }
            str += "</ul>";
            htmlWrapping();
        };
    
        htmlWrapping = function(){
            var pc = $("<div class=\"pc_pageNavigation\">" + str + "</div>");
            var mb = $("<div class=\"mb_pageNavigation\" id=\"mobilePageNavigation\"><div class=\"wrap\">" + str + "</div></div>");
            if(dom.pc_subtab.size() === 0 && dom.pc_topvisual.size() === 1){//1:1 문의는 sub_tab이 없으므로 비주얼 밑에 삽입
                pc.insertAfter(dom.pc_topvisual);
                mb.insertAfter(dom.mb_topvisual);
            }else if(dom.pc_subtab.size() === 0 && dom.pc_topvisual.size() === 0){//개인정보처리방침은 sub_tab과 top_visual이 없으므로 container 안에 삽입
                pc.insertBefore(dom.pc_container.children().eq(0));
                mb.insertBefore(dom.mb_container.children().eq(0));
            }else{//나머지 일반 페이지는 sub_tab 아래에 삽입
                pc.insertAfter(dom.pc_subtab);
                mb.insertAfter(dom.mb_subtab);
            }
            iScrollInit();
        };
    
        //iscroll event binding
        iScrollInit = function(){
            var obj = $("#mobilePageNavigation .wrap");
            var result = 0, i = 0;
            obj.css("width", function(){
                var myList = $(this).find("li");
                for(; i < myList.size(); i++){
                    result += myList.eq(i).width() + 30;
                }
                if(result < window.innerWidth){
                    result = window.innerWidth - 100;
                }
                return result + 230 + "px";
            });
            timeout = setTimeout(function(){
                iScrollinstance = new iScroll('mobilePageNavigation', {
                    hScroll : true,
                    vScroll : false,
                    vScrollbar : false,
                    hScrollbar : false
                });
                //last 항목을 default 로 보여준다.
                obj.css("transform", function(){
                    return "translate3d(" + (window.innerWidth - $(this).width() - 20) + "px, 0px, 0px)";
                });
                clearTimeout(timeout);
            }, delay);
        }
    
        iScrollReset = function(){
            iScrollinstance.destroy();
            resetTimeout = setTimeout(function(){
                iScrollInit();
                clearTimeout(resetTimeout);
            }, delay);
        }
    
        return {
            init : initModule,
            iScrollReset : iScrollReset
        };
    })();
    createDom.init();
    
    //사용자가 화면을 리사이징 할때, 아이스크롤 이벤트를 destroy 하고, 다시 호출해야 갱신됨 (현재 80px마다 갱신함)
    if(location.href.search("main.jsp") < 0){//메인 제외
        responsiveCallbackFn({
            "680-3840" : {
                "name" : "iscroll1",
                "callback" : function(){
                    createDom.iScrollReset();
                }
            },
            "600-680" : {
                "name" : "iscroll2",
                "callback" : function(){
                    createDom.iScrollReset();
                }
            },
            "520-600" : {
                "name" : "iscroll3",
                "callback" : function(){
                    createDom.iScrollReset();
                }
            },
            "440-520" : {
                "name" : "iscroll4",
                "callback" : function(){
                    createDom.iScrollReset();
                }
            },
            "360-440" : {
                "name" : "iscroll5",
                "callback" : function(){
                    createDom.iScrollReset();
                }
            },
            "0-360" : {
                "name" : "iscroll6",
                "callback" : function(){
                    createDom.iScrollReset();
                }
            }
        }).resize();
    }
});

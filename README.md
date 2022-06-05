# Vegin &nbsp;<img height="35" alt="logo" src="https://user-images.githubusercontent.com/74102394/171581538-3d67c356-229e-4829-a5ae-870404d40347.png"> 
> 공공API와 머신러닝을 활용한 비건 커뮤니티

### 1. 프로젝트 제작 기간 및 참여 인원

* 2022년 1월 ~ 6월초

* 팀 프로젝트(4명)

  * **팀장**: 1991194 정예은
  * **팀원**: 1991166 윤소정, 19911121 이가인, 1991147 편주혜

  

### 2. 프로젝트 수행 목적
#### 2.1 프로젝트 정의
비건들을 위한 개인 맞춤형 레시피·제품·음식점 등을 추천하는 정보 공유 커뮤니티.
#### 2.2 프로젝트 배경
한국채식비건협회에 따르면 국내 채식 인수는 2008년 15만명에서 지난 해 250만명으로 급증했으며 비건이 단순한 식품 섭취 습관을 뛰어넘어 하나의 소비 트렌드로 자리 잡아가면서 친환경, 윤리적 가치를 중요시하는 사람들이 급증하고 있다. 이렇게 비건 인구가 급격히 증가하고, 시장이 급성장하고 있음에도 불구하고 해외에 비해 국내에선 비건을 위한 정보나 서비스를 다양하게 제공하는 사이트들이 적은 편이다. 따라서 비건에 대한 정보를 접할 기회는 많지 않고 필요한 정보를 얻는 데에도 많은 시간을 들여 불편함을 느낄 때가 많았다.
우리는 비건들이 겪는 정보 수집 등의 어려움을 해소하고자 머신러닝을 기반으로 하여 사용자에 맞게 레시피와 식당 및 제품을 추천하고 다양한 상품을 판매하며 서로 자유롭게 소통하고 정보를 공유할 수 있는 커뮤니티 서비스를 제공하려고 한다.

#### 2.3 프로젝트 목표
- 비건 음식점 찾기
  + 서울시 공공데이터 오픈 api를 이용해 비건 식당과 카페 등을 검색하고 관련 정보를 얻을 수 있다.
- 레시피 검색
  + 웹크롤링을 이용해 재료 혹은 음식 이름을 검색하면 레시피를 찾을 수 있다.
- 게시판을 통한 소통 및 기록
  + 사용자는 자유게시판을 통해 비건에 대한 소식, 정보, 의견 등을 자유롭게 글로 남길 수 있다.
  + 사용자는 다이어리 게시판을 통해 나의 비건 라이프 실천 일기를 남길 수 있다.
  + 자유게시판, 다이어리에 작성된 글들은 사용자들에게 공유됨에 따라 정보를 제공및 수집하고, 댓글 작성을 통해 자유롭게 소통할 수 있다.
- 머신러닝 기반 상품 추천
  + 사용자가 조회(또는 구매)하였던 관심 레시피/제품/음식점을 학습하여 개인화 맞춤 추천 서비스를 제공한다.

### 3. 프로젝트 개요
#### 3.1 프로젝트 설명
웹 크롤링을 이용하여 비건 레시피 데이터를 수집하고, 사용자가 재료나 음식의 키워드를 검색하면 관련된 레시피를 제공한다. 비건 음식점에 대한 정보는 지도 api를 사용하여 제공한다. 사용자들은 비건 관련 상품을 구매할 수 있고, 자유게시판에 자신의 의견과 비건 소식, 정보 등을 자유롭게 글로 남길 수 있으며, 다이어리 게시판에 비건 라이프를 기록할 수 있다.
#### 3.2 프로젝트 구조
<img width="1078" alt="project-structure" src="https://user-images.githubusercontent.com/74102394/171580891-d77de019-1e4e-4fb1-aa62-72a8c2a41340.png">

### 4. ERD 설계



### 5. 페이지 설명

#### Index.js

> #### 홈 페이지
>
> ##### - 4가지 카테고리(RECIPE, SHOP, PLACE, COMMUNITY)의 FEATURED
>
> ##### - Vegin's story (ABOUT 탭의 VEGIN 페이지로의 이동)
>
> ##### - VEGIN'S MAGAZINE (비건 관련 매거진)



#### JoinPage.js

> #### 회원가입 페이지
>
> ##### `회원 이름 ` 과  `아이디` , `비밀번호`, `이메일`, `전화번호`, `주소` , `생년월일`을 입력 받음
>
> ##### @NotBlank, @Size, @Pattern 등을 사용하여 유효성 검증
>
> ##### 회원가입 완료 직후 홈 페이지로 Redirect



#### LoginPage.js

> #### 로그인 페이지
>
> ##### - 아이디와 비밀번호를 입력 받아 동작, 유효하지 않을 경우 알림창으로 메시지 전달
>
> ##### - Local Storage에 member라는 Key로 Item을 저장하는 방법으로 로그인 여부 확인



#### MypagePage.js

> #### 마이페이지
>
> ##### - 회원정보 중 이름과 아이디, 전화번호, 주소, 가입일 확인 가능
>
> ##### - 유효성 검사 검쳐 회원정보 변경
>
> ##### - 장바구니 / 관심 상품 / 내 글 목록 조회 및 수정



#### details.html

> #### 식당 상세 페이지
>
> ##### 오픈 API 정보와 연동해 식당 주소, 전화번호, 메뉴 등을 확인 할 수 있음
>
> ##### 다른 사용자가 작성한 해당 식당에 대한 리뷰를 볼 수 있음
>
> ##### 카카오 지도 API를 이용해 식당 위치를 지도상으로 확인할 수 있음



#### commu.html

> #### 사용자들이 작성한 리뷰 모아보기 페이지
>
> ##### 리뷰 작성자, 리뷰 등록시 업로드한 이미지, 별점을 확인할 수 있음
>
> ##### 해당 리뷰를 클릭하면 리뷰한 식당 상세 페이지로 이동함



#### suggestion.html

> #### 건의하기 페이지
>
> ##### 이메일과 내용을 입력할 수 있으며 @Validated를 사용해 사용자의 입력을 검증함



#### error.html

> #### 에러 페이지
>
> ##### spring boot default 에러 페이지로 사용함



#### MypagePage.js

> #### 마이페이지
>
> ##### - 회원 정보 중 이름과 아이디, 전화번호, 주소, 가입일 확인 가능



#### mypagebookmark.html

> #### 즐겨찾기 페이지
>
> ##### 평소 즐겨찾기를 해둔 식당과 사용자 본인이 작성한 리뷰를 한데 모아 확인할 수 있음
>
> ##### Ajax를 이용하여 DB와의 비동기 통신으로 구현



#### updatepassword / updateprofile.html

> #### 회원 정보 수정 페이지
>
> ##### 닉네임, 이메일, 비밀번호를 변경할 수 있음



#### writereview.html

> #### 리뷰 작성 페이지
>
> ##### 식당에 대한 리뷰와 별점, 이미지를 `multipart`로 전송
>
> ##### 로그인 되어있는 상태에서만 작성할 수 있도록 구현
>
> ##### 로그인 상태가 아닐 경우 로그인 페이지로 유도



#### searchresult / 2 / 3.html

> #### 검색 결과 페이지
>
> ##### 검색 키워드를 식당 / 음식 으로 나누어 적용하고 사용자가 드롭박스에서 선택.





### 6. 실행 화면



### 7. 기대효과

- 정보들을 한데 모아 사용자가 비건 상품이나 장소 등을 쉽게 검색할 수 있고 게시판에서 다양한 경험과 지식을 접할 수 있어 비건에 대한 정보를 얻기 위해 드는 시간과 노력을 감소시킬 수 있다.
- 사용자의 취향을 학습하고 이를 반영한 제품을 추천해 편의성을 제공한다.



### 8. 사용 기술

- **JAVA**   

- **React**   

- **Javascript**   

- **Node.js**   

- **MySQL**   

- **카카오 지도 API**   

- **Python**   

  

### 9. 개발도구

- **IntelliJ IDEA**   
- **Visual Studio Code**   
- **MySQL Workbench**   




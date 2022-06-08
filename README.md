# Vegin &nbsp;<img height="35" alt="logo" src="https://user-images.githubusercontent.com/74102394/171581538-3d67c356-229e-4829-a5ae-870404d40347.png"> 
> 공공API와 머신러닝을 활용한 비건 커뮤니티

[![Video Label](http://img.youtube.com/vi/9u9Y_aCMLbc/0.jpg)](https://youtu.be/9u9Y_aCMLbc)

### 1. 프로젝트 제작 기간 및 참여 인원

* 2022년 3월 10일 ~ 2022년 6월 8일

* 팀 프로젝트(4명)

  * **팀장**: 1991194 정예은
  * **팀원**: 1991166 윤소정, 19911121 이가인, 1991147 편주혜

* 역할 분담

  | 팀장/팀원 |  이름  |            역할             |
  | :-------: | :----: | :-------------------------: |
  |   팀장    | 정예은 | backend, frontend, AWS 관리 |
  |   팀원    | 윤소정 |      backend, frontend      |
  |   팀원    | 이가인 | backend, frontend, 머신러닝 |
  |   팀원    | 편주혜 | backend, frontend, 머신러닝 |

<br/>

### 2. 프로젝트 수행 목적

#### 2.1 프로젝트 정의
비건들을 위한 개인 맞춤형 레시피·제품·음식점 등을 추천하는 정보 공유 커뮤니티.

#### 2.2 프로젝트 배경
한국채식비건협회에 따르면 국내 채식인 수는 2008년 15만명에서 지난 해 250만명으로 급증했으며 비건이 단순한 식품 섭취 습관을 뛰어넘어 하나의 소비 트렌드로 자리 잡아가면서 친환경, 윤리적 가치를 중요시하는 사람들이 늘고 있다.

이렇게 비건 인구가 급격히 증가하고, 시장이 성장하고 있음에도 불구하고 해외에 비해 국내에선 비건을 위한 정보나 서비스를 다양하게 제공하는 사이트들이 적은 편이다. 따라서 비건에 대한 정보를 접할 기회는 많지 않고 필요한 정보를 얻는 데에도 많은 시간이 소요되어 불편함을 느낄 때가 많았다.

우리는 비건들이 겪는 정보 수집 등의 어려움을 해소하고자 머신러닝을 기반으로 하여사용자에 맞게 레시피와 상품 및 음식점을 추천하고 다양한 상품을 판매하며 서로 자유롭게 소통하고 정보를 공유할 수 있는 커뮤니티 서비스를 제공하려고 한다. 

#### 2.3 프로젝트 목표
- 비건 음식점 찾기
  + 서울시 열린데이터 광장 오픈 API를 이용해 비건 식당과 카페 등을 검색하고 관련 정보를 얻을 수 있다.
- 레시피 검색
  + 웹 크롤링을 이용해 레시피 데이터를 수집하여 저장하고 이를 활용해 재료 혹은 음식명을 검색하면 레시피를 찾을 수 있다.
- 게시판을 통한 소통 및 기록
  + 사용자는 자유게시판을 통해 비건에 대한 소식, 정보, 의견 등을 자유롭게 글로 남길 수 있다.
  + 사용자는 다이어리 게시판을 통해 나의 비건 라이프 실천 일기를 남길 수 있다.
- 머신러닝 기반 추천
  + 사용자가 가장 최근 조회하였던 레시피/상품을 기반으로 개인화 맞춤 추천 서비스를 제공한다.

<br/>

### 3. 프로젝트 개요

#### 3.1 프로젝트 설명
웹 크롤링을 이용하여 비건 레시피 데이터를 수집하고, 사용자가 재료나 음식의 키워드를 검색하면 관련된 레시피를 제공한다. 비건 음식점에 대한 정보는 오픈 API를 사용하여 제공한다. 사용자들은 비건 관련 상품을 구매할 수 있고, 자유게시판에 자신의 의견과 비건 소식, 정보 등을 자유롭게 글로 남길 수 있으며, 다이어리 게시판에 비건 라이프를 기록할 수 있다. 레시피와 상품은 가장 최근 조회 이력을 바탕으로 머신러닝을 사용하여 추천 리스트를 제공한다.

#### 3.2 프로젝트 구조
<img width="800" alt="project structure" src="https://user-images.githubusercontent.com/73582215/172617167-72d8c92d-e982-4aef-a0bb-6c4f09e14cbe.png"> 

<br/>

### 4. ERD 설계
<img width="900" alt="Database ERD" src="https://user-images.githubusercontent.com/73582215/172619391-217d8b55-f203-48fc-a073-6c68c2aa1e90.jpg">

<br/>

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
> ##### `회원 이름` 과  `아이디` , `비밀번호`, `이메일`, `전화번호`, `주소` , `생년월일`을 입력 받음
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


#### AboutVeganPage & AboutVeginPage.js

> #### ABOUT 페이지
>
> ##### - 비건 설명 & Vegin 브랜드 소개
>
> ##### - 비건에 대한 소식, 정보를 전하는 매거진 제공


#### RecipePage.js

> #### RECIPE 메인 페이지
>
> ##### - 카테고리 선택 및 키워드(재료명/요리명) 검색
>
> ##### - RECOMMEND (8가지 레시피 추천)
>
> ##### - 레시피 목록 최신순/인기순 정렬


#### RecipeDetailPage.js

> #### Recipe 상세 페이지
>
> ##### - 특정 레시피의 재료, 조리 순서 등 확인


#### ShopPage.js

> #### SHOP 메인 페이지
>
> ##### - 카테고리 선택 및 키워드 검색
>
> ##### - RECOMMEND (8가지 상품 추천)
>
> ##### - 상품 목록 인기순/최저가순 정렬


#### ShopDetailPage.js

> #### SHOP 상세 페이지
>
> ##### - 특정 상품의 이름, 가격 등 확인
>
> ##### - 옵션 선택 후 장바구니 담기
>
> ##### - 상품정보 / 상품후기 / 상품문의


#### PlacePage.js

> #### PLACE 메인 & PLACE 상세 페이지
>
> ##### - 음식점 목록과 지도 제공 및 키워드 검색
>
> ##### - 특정 음식점의 상세 정보와 지도 내 마커 위치 확인


#### ListBoardComponent / ListDiaryComponent.js

> #### COMMUNITY 메인 페이지
>
> ##### - 자유게시판 / 다이어리의 BEST (4개의 인기글)
>
> ##### - 게시글 목록 페이지네이션 및 키워드 검색
>
> ##### - 글 작성 페이지로 이동 가능


#### ReadBoardComponent / ReadDiaryComponent.js

> #### COMMUNITY 상세 페이지
>
> ##### - 특정 게시글의 제목, 작성자, 내용 등 확인
>
> ##### - 글 수정 및 삭제, 댓글 등록/수정/삭제

<br/>

### 6. 실행 화면

* **HOME 화면 & ABOUT 카테고리**

  * HOME

    <img width="800" title="HOME" alt="HOME" src="https://user-images.githubusercontent.com/73582215/172619918-ae1210c1-720b-4521-9686-5d2b481a7268.png">

  * ABOUT - VEGAN

    <img width="800" title="ABOUT - VEGAN" alt="ABOUT - VEGAN" src="https://user-images.githubusercontent.com/73582215/172620358-7a69dcfc-e4e3-41f3-9237-12698301086b.png">
    
  * ABOUT - VEGIN

    <img width="800" title="ABOUT - VEGIN" alt="ABOUT - VEGIN" src="https://user-images.githubusercontent.com/73582215/172654493-1f9f4f85-0030-440b-99f0-ae6681a8e596.png">

  * 로그인, 회원가입, 마이페이지로 이동할 수 있다.

  * 레시피, 샵, 플레이스, 커뮤니티 별 인기 있는 항목을 메인 화면에 보여준다.

  * 비건에 대한 소식, 정보를 알려주는 매거진을 제공한다.

  * Vegin 커뮤니티에 대한 소개와 비건에 대한 정보를 확인할 수 있다.
<br/>
* **RECIPE 카테고리**

  * RECIPE

    <img width="800" title="RECIPE" alt="RECIPE" src="https://user-images.githubusercontent.com/73582215/172656635-59f149df-b40e-4157-bf78-003b040f9802.png">
  * RECIPE 상세

    <img width="800" title="RECIPE Detail" alt="RECIPE Detail" src="https://user-images.githubusercontent.com/73582215/172656790-3341f914-af1f-4efb-9b94-e06c188e2f2f.png">
    
  * RECIPE 카테고리를 클릭하면, 다양한 비건 음식 추천 레시피를 볼 수 있다.

  * 재료명 또는 메뉴명으로 레시피를 직접 검색하여 찾을 수 있다.

  * 원하는 레시피를 선택하면 재료와 조리 단계에 대한 내용을 상세하게 확인할 수 있다.

  * 특정 레시피 클릭 시 사용자별로 세션id 값을 담은 쿠키가 생성되고, 사용자가 클릭한 아이템의 로그를 쿠키 value, 아이템 id, 접속 time 순서로 기록하며, 추천 시스템의 input값은 이 로그에서 가장 최근에 기록된 것을 사용한다.

  * sqlalchemy 라이브러리를 사용해 MySQL DB와 연동하여 이름, 카테고리, 재료, 조리방법을 가져온다.

  * sklearn 라이브러리를 사용해 tf-idf를 통해 구한 DTM으로 linear_kernel을 통해 유사도를 구한 뒤, 가장 유사도가 높은 8개의 레시피를 반환한다. 이 때 카테고리 및 재료, 이름, 조리방법에 다른 가중치를 주어 유사도를 계산한다.

  * java와 python 연동은 apache commons exec 라이브러리를 사용한다.


* **SHOP 카테고리**

  * SHOP

    <img width="800" title="SHOP" alt="SHOP" src="https://user-images.githubusercontent.com/73582215/172659892-5dd11dc3-595b-4fa8-81a5-b973b7ea9513.png">
  
  * SHOP 상세

    <img width="800" title="SHOP Detail" alt="SHOP Detail" src="https://user-images.githubusercontent.com/73582215/172659824-d5638e83-e553-4c46-848c-0c9175eb1baa.png">
  
  * SHOP 카테고리를 클릭하면, 사용자가 조회 또는 구매하였던 상품과 유사한 상품들을 살펴볼 수 있고, 품명 또는 품목의 키워드로 관련된 상품을 검색할 수 있다. 
  
  * 원하는 상품을 선택하면 상품의 상세 정보를 확인할 수 있고, 원하는 옵션과 수량 등을 입력하여 상품을 장바구니에 담거나 구매할 수 있다.
  
  * 사용자가 상품의 구매를 결정하면 결제 시스템으로 이동한다.
  
  * 특정 상품 클릭 시 사용자별로 세션id값을 담은 쿠키가 생성되고, 사용자가 클릭한 아이템의 로그를 쿠키 value, 아이템 id, 접속 time 순서로 기록하며, 추천 시스템의 input값은 이 로그에서 가장 최근에 기록된 것을 사용한다.
  
  * sqlalchemy 라이브러리를 사용해 MySQL DB와 연동하여 이름, 카테고리를 가져온다.
  
  * sklearn 라이브러리를 사용해 tf-idf를 통해 구한 DTM으로 linear_kernel을 통해 유사도를 구한 뒤, 가장 유사도가 높은 8개의 상품을 반환한다.
  
  * java와 python 연동은 apache commons exec 라이브러리를 사용한다. 


* **PLACE 카테고리**

  * PLACE

    <img width="800" title="PLACE" alt="PLACE" src="https://user-images.githubusercontent.com/73582215/172660854-8ee5761f-cc0b-48d4-b01d-36107e6a7fa7.png">
  
  * PLACE 상세

    <img width="800" title="PLACE Detail" alt="PLACE Detail" src="https://user-images.githubusercontent.com/73582215/172661581-5766e31c-54fb-4e26-ab12-f41da49445c2.png">
  
  * 사용자는 비건 음식점을 찾을 수 있고, 음식점의 상세 정보를 조회할 수 있다.
  
  * 지도를 이동해 원하는 지역의 비건 음식점을 찾을 수 있고, 음식점 검색을 통해 원하는 음식점의 정보를 조회할 수 있다.


* **COMMUNITY 카테고리**

  * COMMUNITY

    <img width="800" title="COMMUNITY" alt="COMMUNITY" src="https://user-images.githubusercontent.com/73582215/172662378-358dc872-b622-451a-80d9-6fbf926d0732.png">
  
  * COMMUNITY 상세

    <img width="800" title="COMMUNITY Detail" alt="COMMUNITY Detail" src="https://user-images.githubusercontent.com/73582215/172662463-b1857518-cd51-4027-bdd7-49c43c3eed7c.png">
  
  * 자유게시판과 다이어리 게시판이 있다.
  
  * 글 및 댓글 작성은 회원가입/로그인을 해야 가능하다.
  
  * 자유게시판과 다이어리의 글은 누구나 조회가 가능하다.
  
  * 작성한 모든 글은 수정 및 삭제가 가능하다.

<br/>

### 7. 기대효과

- 정보들을 한데 모아 사용자가 비건 상품이나 장소 등을 쉽게 검색할 수 있고 게시판에서 다양한 경험과 지식을 접할 수 있어 비건에 대한 정보를 얻기 위해 드는 시간과 노력을 감소시킬 수 있다.
- 사용자의 취향을 학습하고 이를 반영한 제품을 추천해 편의성을 제공한다.

<br/>

### 8. 사용 기술

- **JAVA**   

- **React**   

- **Javascript**   

- **MySQL**   

- **Kakao 지도 API**

- **네이버 검색 API**

- **Python**   

<br/>

### 9. 개발도구

- **IntelliJ IDEA**  

- **Visual Studio Code**   

- **MySQL Workbench**   

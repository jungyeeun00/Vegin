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
비건을 위한 레시피·상품·음식점을 소개하는 정보 공유 커뮤니티

#### 2.2 프로젝트 배경
국내 비건 인구가 10배 이상 급증하며 비건이 하나의 소비 트렌드로 자리 잡아가고 있다.

그럼에도 불구하고 해외에 비해 국내에선 비건을 위한 정보나 서비스를 다양하게 제공하는 사이트들이 적은 편이어서 비건에 대한 정보를 수집하는 것이 어렵다.

우리는 비건들이 겪는 정보 수집의 어려움을 해소하고자 다양한 정보들을 한데 모아 제공함과 동시에 자유로운 온라인 소통 공간을 제공하려고 한다.

#### 2.3 프로젝트 목표
* 비건 음식점 찾기

* 레시피 & 상품 조회

* 게시판을 통한 소통 및 기록

* 머신러닝 기반 추천

<br/>

### 3. 프로젝트 개요

#### 3.1 프로젝트 설명
웹 크롤링을 이용하여 비건 레시피 및 상품 데이터를 수집하고, 사용자가 키워드를 검색하면 관련된 레시피/상품을 제공한다. 비건 음식점에 대한 정보는 오픈 API를 사용하여 제공한다. 자유게시판에 자신의 의견과 비건 소식, 정보 등을 자유롭게 글로 남길 수 있으며, 다이어리 게시판에 비건 라이프를 기록할 수 있다. 레시피와 상품은 가장 최근 조회 이력을 바탕으로 머신러닝을 사용하여 추천 리스트를 제공한다.

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

<br/>

#### JoinPage.js

> #### 회원가입 페이지
>
> ##### `회원 이름` 과  `아이디` , `비밀번호`, `이메일`, `전화번호`, `주소` , `생년월일`을 입력 받음
>
> ##### @NotBlank, @Size, @Pattern 등을 사용하여 유효성 검증
>
> ##### 회원가입 완료 직후 홈 페이지로 Redirect

<br/>

#### LoginPage.js

> #### 로그인 페이지
>
> ##### - 아이디와 비밀번호를 입력 받아 동작, 유효하지 않을 경우 알림창으로 메시지 전달
>
> ##### - Local Storage에 member라는 Key로 Item을 저장하는 방법으로 로그인 여부 확인

<br/>

#### MypagePage.js

> #### 마이페이지
>
> ##### - 회원정보 중 이름과 아이디, 전화번호, 주소, 가입일 확인
>
> ##### - 회원정보 변경
>
> ##### - 장바구니 / 관심 상품 / 내 글 목록 조회 및 수정

<br/>

#### AboutVeganPage & AboutVeginPage.js

> #### ABOUT 페이지
>
> ##### - 비건 설명 & Vegin 브랜드 소개
>
> ##### - 비건에 대한 소식, 정보를 전하는 매거진 제공

<br/>

#### RecipePage.js

> #### RECIPE 메인 페이지
>
> ##### - 카테고리 선택 및 키워드(재료명/요리명) 검색
>
> ##### - RECOMMEND (머신러닝을 이용해 8가지 레시피 추천)
>
> ##### - 레시피 목록 최신순/인기순 정렬

<br/>

#### RecipeDetailPage.js

> #### Recipe 상세 페이지
>
> ##### - 특정 레시피의 재료, 조리 순서 등 확인

<br/>

#### ShopPage.js

> #### SHOP 메인 페이지
>
> ##### - 카테고리 선택 및 키워드 검색
>
> ##### - RECOMMEND (머신러닝을 이용해 8가지 상품 추천)
>
> ##### - 관심 상품 추가/취소
> 
> ##### - 상품 목록 인기순/최저가순 정렬

<br/>

#### ShopDetailPage.js

> #### SHOP 상세 페이지
>
> ##### - 특정 상품의 이름, 가격 등 확인
>
> ##### - 옵션 선택 후 장바구니 담기
>
> ##### - 상품정보 / 상품후기 / 상품문의

<br/>

#### PlacePage.js

> #### PLACE 메인 & PLACE 상세 페이지
>
> ##### - 음식점 목록과 지도 제공 및 키워드 검색
>
> ##### - 특정 음식점의 상세 정보와 지도 내 마커 위치 확인

<br/>

#### ListBoardComponent / ListDiaryComponent.js

> #### COMMUNITY 메인 페이지
>
> ##### - 자유게시판 / 다이어리
>
> ##### - BEST (4개의 인기글)
>
> ##### - 게시글 목록 및 키워드 검색
>
> ##### - 글 작성 페이지로 이동 가능

<br/>

#### ReadBoardComponent / ReadDiaryComponent.js

> #### COMMUNITY 상세 페이지
>
> ##### - 특정 게시글의 상세 내용 확인
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

<br/>

* **RECIPE 카테고리**

  * RECIPE

    <img width="800" title="RECIPE" alt="RECIPE" src="https://user-images.githubusercontent.com/73582215/172656635-59f149df-b40e-4157-bf78-003b040f9802.png">
  * RECIPE 상세

    <img width="800" title="RECIPE Detail" alt="RECIPE Detail" src="https://user-images.githubusercontent.com/73582215/172656790-3341f914-af1f-4efb-9b94-e06c188e2f2f.png">

<br/>

* **SHOP 카테고리**

  * SHOP

    <img width="800" title="SHOP" alt="SHOP" src="https://user-images.githubusercontent.com/73582215/172659892-5dd11dc3-595b-4fa8-81a5-b973b7ea9513.png">
  
  * SHOP 상세

    <img width="800" title="SHOP Detail" alt="SHOP Detail" src="https://user-images.githubusercontent.com/73582215/172659824-d5638e83-e553-4c46-848c-0c9175eb1baa.png">

<br/>

* **PLACE 카테고리**

  * PLACE

    <img width="800" title="PLACE" alt="PLACE" src="https://user-images.githubusercontent.com/73582215/172660854-8ee5761f-cc0b-48d4-b01d-36107e6a7fa7.png">
  
  * PLACE 상세

    <img width="800" title="PLACE Detail" alt="PLACE Detail" src="https://user-images.githubusercontent.com/73582215/172661581-5766e31c-54fb-4e26-ab12-f41da49445c2.png">

<br/>

* **COMMUNITY 카테고리**

  * COMMUNITY

    <img width="800" title="COMMUNITY" alt="COMMUNITY" src="https://user-images.githubusercontent.com/73582215/172662378-358dc872-b622-451a-80d9-6fbf926d0732.png">
  
  * COMMUNITY 상세

    <img width="800" title="COMMUNITY Detail" alt="COMMUNITY Detail" src="https://user-images.githubusercontent.com/73582215/172662463-b1857518-cd51-4027-bdd7-49c43c3eed7c.png">

<br/>

### 7. 기대효과

- 정보들을 한데 모으고, 사용자간의 소통과 경험 및 지식 공유가 가능한 게시판을 제공해 정보 수집의 편리성을 높이고 시간과 노력을 감소시킬 수 있다.

- 사용자가 조회한 제품을 바탕으로 추천 서비스를 제공해 정보 수집의 편의성을 높인다.

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

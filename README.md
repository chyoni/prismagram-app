## Prismagram App

- expo global 설치 (yarn global add expo-cli 또는 npm -g install expo-cli)

- 설치가 다 되면 expo init 프로젝트명 << 실행

- 그럼 폴더안에 기본 세팅이 생기고 code . << 실행

- 첫째로는 당장에 필요한 패키지를 다운 받아야함

- @expo/vector-icons apollo-boost apollo-cache-inmemory apollo-cache-persist expo-asset expo-font graphql react-apollo-hooks styled-components 설치

- expo start를 하면 expo 브라우저창이 하나가 뜨고 window라서 난 내 아이폰과 연동했음 (expo 앱을 이용)

- AppLoading 이라는 컴포넌트를 expo패키지에서 가져옴 얘는 필요한 것들이 로딩이 다되기전에 띄워주는 컴포넌트임 우리가 fontend에서 했던 Loader랑 같은거라 생각하면 됨 얘는 가장 맨처음 Mount되는 컴포넌트에서만 실행이 가능하다고 써져있음 즉, App.js에서만 사용가능하단 얘기임

- useEffect는 componentDidMount랑 똑같은거라고 보면됨 즉 컴포넌트들이 마운드될때 실행되는 함수임

- 그래서 preLoad를 useEffect가 실행시키면 앱이실행될때 가장먼저 실행되는 함수는 useEffect고 그안에 preLoad라는 함수가 될거임 그 preLoad는 async await이여야함 로딩해야하니까 기다려줘야하니까 그 안에 우리는 Font를 로딩할거임 그 Font는 Ionicons.Font 임 모든 로딩을 다하면 state를 사용해서 loading state를 바꿔주면 됨

- 앱자체에서 오는 모든 이미지들은 다 Asset에 넣어야함 유저가 올리는 사진이랑은 별개로 앱이 실행될때 앱 자체에서 나오는 이미지들은 다 Asset폴더에 넣어놓고 역시 preLoad에서 불러와야함

- 모든 유저는 자기의 데이터를 그대로 유지되길 원하겠지? 그러니까 당연히 이전의 데이터를 다 보존해야함 그러기위해서 사용하는 것이 apollo-cache-persist와 apollo-cache-inmemory임

- AsyncStorage는 localStorage랑 똑같은거라고 보면됨 앱에서의 스토리지임

- 자 그래서 일단 cache를 생성해야함 그 이후에 그 캐시를 보존할 persistCache 함수를 실행하고 그 캐시를 담고 여러 옵션을 담을 ApolloClient를 실행함 참고로 저기서 ... 은 옵션이라는 오브젝트안에 있는 하나하나의 자식들을 의미함 그래서 client가 만들어지면 우리는 이걸 한번더 체크해서 state로 담을거임 어케하느냐면 state로 client를 만들어서 default값은 null로 해주고 preLoad에서 client에 대한 모든 로직이 끝나면 setClient를 방금만든 client로 담아줄거임 그러고나서 return 단계에서 state가 null인지 아닌지를 체크를 해준다음에 ApolloProvider를 통해 우리의 client를 프로바이드해주면 됨

- context라는건 우리가 알던 context랑 똑같음 그냥 원하는 어떤것이던 (여기저기서 사용될) 넣어놓고 나눠서 사용하는거임 예를들면 리덕스의 스토어같은 역할? 저장해두고 원하는 컴포넌트에서 가져다가 쓰는것처럼 이것도 똑같음 우리는 일단 isLoggedIn 하고 logUserIn , logUserOut 을 AuthContext안에 넣고싶음 그래서 파일하나를 만들고 Context를 사용하면됨 여기서는 Context와 그 Context에 제공될 데이터를 저장하는 Provider를 따로 나눠서 만들고 Provider가 Context에게 모든 데이터를 value를 통해 주면 그 Context를 useContext라는 Hook을 이용해서 가져다가 쇽쇽 쓰면됩니당

- 이제 react-navigation 이라는 슈퍼파워 패키지를 사용할거임 이거는 router랑 비슷한 놈이라고 보면 됨 아마 navigation은 여러개가있을건데 일단 가장 먼저 AuthNavigation을 정의해보면 각각의 라우팅될 Router들을 정의하고 그 navigator 에 넣으면됨 그리고 그 navigation을 사용할 컴포넌트에서 불러서 사용하면되는데 이 navigation이 엄청 강력함 좋음

- 진짜로 react-navigation은 정말 엄청난 모듈임 일단 BottomTabNavigator 는 밑에 탭 네비게이션을 말하는데 정말로 너무 좋음

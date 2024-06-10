# 리액트 스니펫이란?

리액트 스니펫은 미리 정의된 코드 블록으로, 개발자가 특정 키워드를 입력하면 해당 키워드에 매핑된 코드 블록이 자동으로 확장됩니다. 이는 자주 사용하는 리액트 코드의 작성 시간을 줄여주고, 반복적인 타이핑을 방지해 줍니다.

## 예시: 리액트 함수형 컴포넌트 생성

리액트 스니펫의 대표적인 예로, 함수형 컴포넌트를 만드는 스니펫을 들 수 있습니다. 보통 다음과 같은 코드를 자주 작성하게 됩니다:

```
import React from 'react';

const Home = () => {
   return (
       <div>

       </div>
   );
};

export default Home;

```

## 커스텀 스니펫 만들기
```
{
    "rfcmy": {
        "prefix": "rfcmy",
        "body": [
            "import React from 'react';",
            "",
            "const ${1:ComponentName} = () => {",
            "    return (",
            "        <div>",
            "            $0",
            "        </div>",
            "    );",
            "};",
            "",
            "export default ${1:ComponentName};"
        ],
        "description": "Create a custom functional component"
    }
}
```

일단 나는 확장프로그램 이슈로 스니펫을 제대로 제작하지 못해봤다.
확장프로그램이 아니어도 다른 사이트에서 스니펫으로 변경하고자하는 코드를 넣고 변환 후 저장하는 방식도 있는 듯하다
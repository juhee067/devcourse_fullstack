import React, { useEffect } from 'react';
import Button from '../common/Button';

interface Props {
  onCompleted: (address: string) => void;
}

const SCRIPT_URL = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const FindAddressButton = ({ onCompleted }: Props) => {
  //스크립트 로드
  // 핸들러
  //입력

  const handleOpen = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        onCompleted(data.address as string);
      },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    document.body.appendChild(script);
    // <head><script src="URL"></script></head>
    return () => {
      document.body.removeChild(script);
    };
  });
  return (
    <div>
      <Button type='button' size='medium' scheme='normal'>
        주소 찾기
      </Button>
    </div>
  );
};

export default FindAddressButton;

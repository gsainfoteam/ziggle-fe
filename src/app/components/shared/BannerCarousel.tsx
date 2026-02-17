"use client";

import React, { useEffect, useRef, useState } from 'react';
import bannerInfoteam from '@/assets/images/banner_infoteam.svg';
import bannerPotg from '@/assets/images/banner_potg.svg';

export default function BannerCarousel() {
  const slides = [
    { image: bannerInfoteam, url: 'https://infoteam-rulrudino.notion.site/2fb365ea27df8061ae1cdd7067d31580?pvs=105' },
    { image: bannerPotg, url: 'https://pot-g.gistory.me/' },
  ];
  // slides 배열에 image(svg파일)와 url(이동할 링크)를 저장.
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  //useState는 값이 바뀌면 컴포넌트가 새로 렌더링
  //useRef는 값이 바뀌어도 값 저장만 되고 컴포넌트가 새로 렌더링 되지 않음.
  //intervalRef라는 변수에 <number 또는 null> 타입의 값을 저장. 초기값은 (null)

  // 슬라이드를 앞으로/뒤로 이동시키는 함수입니다. 끝에 다다르면 처음으로 되돌아갑니다.
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    //useEffect(() => { ... }, [])
    //useEffect 특정 시점에 코드를 실행하는 함수
    //{...} 실행할 코드
    //[...] 실행 시점. 공란-컴포넌트 처음 시작할 때만
    //window.setInterval(실행할 일, 텀) 일정한 시간마다 반복 실행하는 함수. 
    //타이머 ID를 반환하여 clearInterval()로 실행을 멈출 수 있음.
    return () => {
      if (intervalRef.current) 
        window.clearInterval(intervalRef.current);
    };
  }, []);
  //useEffect(()=>{컴포넌트가 시작될 때 실행
  //   return () => {컴포넌트가 없어질 때 실행})

  return (
    <div className="w-full flex justify-center">
      <div
        className="relative w-full max-w-[800px] overflow-hidden rounded-[12px]"
      >
        {slides.map((s, i) => {
          const Slide = s.image as any;
          return (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full transition-transform duration-500 ease-in-out ${
                i === index ? 'translate-x-0' : i < index ? '-translate-x-full' : 'translate-x-full'
              }`}
              style={{ position: i === index ? 'relative' : 'absolute', top: 0, left: 0 }}
              aria-hidden={i !== index}
            >
              <Slide className="w-full h-auto block" />
            </a>
          );
        })}

        <button
          onClick={() => {
            prev();
          }}
          aria-label="이전 배너"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md"
        >
          ‹
        </button>
        <button
          onClick={() => {
            next();
          }}
          aria-label="다음 배너"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md"
        >
          ›
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIndex(i);
              }}
              aria-label={`슬라이드 ${i + 1} 보기`}
              className={`h-2 w-6 rounded-full ${i === index ? 'bg-primary' : 'bg-white/60'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
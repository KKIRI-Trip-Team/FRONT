'use client';

import ICON from '@/public/icons/trip-make-icon.svg';
import Image from 'next/image';

import { motion } from 'framer-motion';
import { slideFadeVariants } from '@/utils/motionVariants';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UseFunnelResults } from '@use-funnel/browser';
import { BoardRegisterTypes } from '@/types/boardRegister';
import { useTripFunnelStore } from '@/store/useTripFunnelStore';
import { useTransitionStore } from '@/store/transitionStore';
import { uploadImageToServer } from '../imageUpload/ImageUpload';
import { useApi } from '@/hooks/useApi';

interface ExplainFunnel {
  funnel: UseFunnelResults<
    BoardRegisterTypes,
    BoardRegisterTypes['explainStep']
  >;
}

export default function ExplainStep({ funnel }: ExplainFunnel) {
  const router = useRouter();
  const { trip, stepIndex, setContext, setStepIndex } = useTripFunnelStore();
  const { direction } = useTransitionStore();
  const { post } = useApi();
  const [image, setImage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    console.log('📦 선택된 파일:', file);

    try {
      const key = await uploadImageToServer(file, post);
      setImage(key); // 이미지 키를 저장
      console.log('✅ 이미지 키:', key);
    } catch (err) {
      console.log('❌ 이미지 업로드 실패:', err);
    }
  };
  // 전역 context
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');

  // 글자수 제한
  const [titleLength, setTitleLength] = useState(0);
  const [subTitleLength, setSubTitleLength] = useState(0);

  useEffect(() => {
    const { title, subTitle, image } = trip.explain;
    setStepIndex(6);
    if (title) {
      setTitle(title);
    }
    if (subTitle) {
      setSubTitle(subTitle);
    }
    if (image) {
      setImage(image);
    }
  }, [title, subTitle, image]);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleLength(e.currentTarget.value.length);
  };

  const onChangeSubtitleLength = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setSubTitle(e.target.value);
    setSubTitleLength(e.currentTarget.value.length);
  };

  const makeDetailTrip = () => {
    setContext({ explain: { title, subTitle, image } });
    router.push('/tripPlanning/tripDetail');
  };

  return (
    <motion.div
      key="explainStep"
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideFadeVariants}
      className="flex flex-col items-center pc:w-[1200px] tb:w-[768px] pb-[40px] pl-[20px] pr-[20px] pt-[20px]  gap-[40px] bg-white  shrink-0 font-[Pretendard] not-italic tracking-[-0.5px]"
    >
      <div className="flex flex-col items-center self-stretch">
        <div className="flex items-center gap-[3px] text-[var(--PrimaryLight)] text-[10px] font-bold leading-[16px] tracking-[-0.5px] text-center">
          <span>{stepIndex}</span>
          <span className="text-[rgba(0,133,255,0.5)]">/</span>
          <span className="text-[rgba(0,133,255,0.5)]">6</span>
        </div>
        <h1 className="text-[var(--Gray900)] text-[20px] font-bold text-center leading-[30px]">
          여정을 작성해 주세요
        </h1>
        <span className="text-[var(--Gray600)] text-[14px] text-center font-normal leading-[20px]">
          각 일자별로 상세 여정을 작성해주세요
        </span>
      </div>

      <div className="pc:w-[1160px] pc:h-[670px] tb:w-[728px] tb:h-[335px] bg-[var(--Gray200)] flex items-center justify-center">
        <label
          htmlFor="imageUpload"
          className="cursor-pointer w-full h-full flex justify-center items-center"
        >
          {image ? (
            <Image
              src={`https://trebuddy-s3-bucket.s3.ap-northeast-2.amazonaws.com/${image}`}
              alt={'boardImage'}
              width={1160}
              height={670}
            />
          ) : (
            <ICON />
          )}
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          hidden
        />
      </div>

      <section className="w-full gap-[4px]">
        <div className="flex h-[48px] items-center gap-[10px] self-stretch border-b-[0.6px] border-b-[var(--Gray400)]">
          <input
            type="text"
            placeholder="여행 제목"
            value={title}
            onChange={onChangeTitle}
            maxLength={30}
            className="flex-1 text-[24px] font-normal leading-[34px] tracking-[-0.5px]  placeholder:text-[#CCC] outline-none pb-[10px]"
          />
        </div>

        <div className="flex justify-end items-start gap-[4px] self-stretch text-[10px] font-bold leading-[16px] tracking-[-0.5px]">
          <span className="text-[var(--Gray900)]">{titleLength}</span>
          <span className="text-[var(--Gray500)]">/</span>
          <span className="text-[var(--Gray500)]">30</span>
        </div>
      </section>

      <section className="w-full gap-[4px]">
        <div className="flex h-[200px] items-start p-[10px] gap-[10px] self-stretch border-[0.6px] border-[var(--Gray400)]">
          <textarea
            placeholder="여행 상세내용"
            value={subTitle}
            onChange={onChangeSubtitleLength}
            rows={5}
            maxLength={400}
            className="flex-1 text-[24px] font-normal leading-[34px] tracking-[-0.5px] placeholder:text-[#CCC] outline-none pb-[10px] resize-none"
          />
        </div>

        <div className="flex justify-end items-start gap-[4px] self-stretch text-[10px] font-bold leading-[16px] tracking-[-0.5px]">
          <span className="text-[var(--Gray900)]">{subTitleLength}</span>
          <span className="text-[var(--Gray500)]">/</span>
          <span className="text-[var(--Gray500)]">400</span>
        </div>
      </section>

      <div className="flex flex-col px-[20px] py-[16px] justify-center items-center gap-[10px] self-stretch rounded-[100px] bg-[var(--Gray900)]">
        <button
          className="text-[var(--white)] text-[14px] font-bold leading-[20px] tracking-[-0.5px] "
          onClick={makeDetailTrip}
        >
          상세일정 만들기
        </button>
      </div>

      <div
        className={`flex h-[54px] w-full px-[0px] py-[16px] justify-center items-center shrink-0 self-stretch bg-[#F1F1F2]`}
      >
        <button>다음</button>
      </div>
    </motion.div>
  );
}

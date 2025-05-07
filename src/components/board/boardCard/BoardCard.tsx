import Image from 'next/image';
import Link from 'next/link';
import CircleIcon from '@/public/icons/circle-icon.svg';

import { BoardType } from '@/types/board';

export default function BoardCard({
  id,
  destination,
  period,
  mainTitle,
  subTitle,
  coverImage,
  profileImage,
  nickname,
  styles,
}: BoardType) {
  return (
    <Link href={`board/${id}`}>
      <div className="flex w-[373px] tb:w-[354px] mb:w-[275px] flex-col justify-center items-start font-[Pretendard]">
        <Image
          className="h-[275px] self-stretch"
          width={0}
          height={275}
          src={coverImage}
          alt={nickname}
        />
        <div className="flex p-[20px] flex-col items-start gap-[10px] self-stretch">
          <div className="flex flex-col items-start gap-[4px] self-stretch">
            <div className="flex h-[20px] items-center gap-[4px] self-stretch">
              <h3 className=" text-[12px] font-bold leading-[18px] tracking-[-0.5px] text-[var(--Gray500)]">
                {destination}
              </h3>
              <h4 className="w-[4px] h-[5px] fill-[var(--Gray300)]">
                <CircleIcon />
              </h4>
              <h3 className="text-[12px] font-bold leading-[18px] tracking-[-0.5px] text-[var(--Gray500)]">
                {period}
              </h3>
            </div>
            <span className="text-[18px] font-bold leading-[26px] tracking-[-0.5px] self-stretch text-[var(--Gray900)]">
              {mainTitle}
            </span>
            <span className="text-[14px] font-bold leading-[20px] tracking-[-0.5px] overflow-hidden text-ellipsis text-[var(--Gray600)]">
              {subTitle}
            </span>
          </div>
          <div className="flex items-center gap-[10px] self-stretch">
            <div className="w-[36px] h-[36px]">
              <Image
                width={36}
                height={36}
                src={profileImage}
                alt={destination}
                className="w-[36px] h-[36px] shrink-0 rounded-[100px] border border-solid border-[var(--Gray200)]"
              />
            </div>
            <div className="flex flex-col justify-center items-start flex-[1_0_0]">
              <span className="text-[12px] font-bold leading-[18px] tracking-[-0.5px]">
                {nickname}
              </span>
              <span className="flex items-center gap-[10px] text-[10px] font-bold leading-[16px] tracking-[-0.5px] text-[var(--Gray600)]">
                {styles.join(' ')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

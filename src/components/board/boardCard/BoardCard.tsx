import Image from 'next/image';
import Link from 'next/link';
import CircleIcon from '@/public/icons/circle-icon.svg';
import { BoardData, cityMap, periodMap, tripStyleMap } from '@/types/board';

export default function BoardCard({
  id,
  region,
  period,
  title,
  content,
  coverImageUrl,
  profileImage,
  nickname,
  tripStyles,
}: BoardData) {
  const regionName = cityMap[region]?.name;
  const periodName = periodMap[period]?.name;

  return (
    <Link href={`board/${id}`}>
      <div className="flex pc:w-[373px] tb:w-[354px] mb:w-[275px] flex-col justify-center items-start font-[Pretendard]">
        {coverImageUrl && (
          <Image
            className="h-[275px] self-stretch"
            width={0}
            height={275}
            src={`https://trebuddy-s3-bucket.s3.ap-northeast-2.amazonaws.com/${coverImageUrl}`}
            alt={nickname}
          />
        )}
        <div className="flex p-[20px] flex-col items-start gap-[10px] self-stretch">
          <div className="flex flex-col items-start gap-[4px] self-stretch">
            <div className="flex h-[20px] items-center gap-[4px] self-stretch">
              <h3 className=" text-[12px] font-bold leading-[18px] tracking-[-0.5px] text-[var(--Gray500)]">
                {regionName}
              </h3>
              <h4 className="w-[4px] h-[5px] fill-[var(--Gray300)]">
                <CircleIcon />
              </h4>
              <h3 className="text-[12px] font-bold leading-[18px] tracking-[-0.5px] text-[var(--Gray500)]">
                {periodName}
              </h3>
            </div>
            <span className="text-[18px] font-bold leading-[26px] tracking-[-0.5px] self-stretch text-[var(--Gray900)]">
              {title}
            </span>
            <span className="text-[14px] font-bold leading-[20px] tracking-[-0.5px] overflow-hidden text-ellipsis text-[var(--Gray600)]">
              {content}
            </span>
          </div>
          <div className="flex items-center gap-[10px] self-stretch">
            <div className="w-[36px] h-[36px]">
              {profileImage && (
                <Image
                  width={36}
                  height={36}
                  src={`https://trebuddy-s3-bucket.s3.ap-northeast-2.amazonaws.com/${profileImage}`}
                  alt={nickname}
                  className="w-[36px] h-[36px] shrink-0 rounded-[100px] border border-solid border-[var(--Gray200)]"
                />
              )}
            </div>
            <div className="flex flex-col justify-center items-start flex-[1_0_0]">
              <span className="text-[12px] font-bold leading-[18px] tracking-[-0.5px]">
                {nickname}
              </span>
              <span className="flex flex-wrap gap-[6px] text-[10px] font-bold leading-[16px] tracking-[-0.5px] text-[var(--Gray600)]">
                {tripStyles.map((style) => (
                  <span key={style}>#{tripStyleMap[style]?.name || style}</span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

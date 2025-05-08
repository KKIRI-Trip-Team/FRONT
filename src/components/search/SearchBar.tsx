'use client';

import Link from 'next/link';

import LeftArrowIcon from '@/public/icons/left-arrow-icon.svg';
import SearchIcon from '@/public/icons/search-icon.svg';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const q = useSearchParams().get('q');
  const router = useRouter();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  // 버튼클릭시 검색
  const onSearchClick = () => {
    if (!search || q === search) {
      return;
    } else {
      router.push(`/search?q=${search}`);
    }
  };

  // 키보드 엔터 누를시 검색
  const onSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchClick();
    }
  };
  return (
    <section className="flex h-[60px] px-[20px] justify-between items-center shrink-0  font-[Pretendard]">
      <Link href={'/'}>
        <LeftArrowIcon />
      </Link>

      <div className="relative w-full">
        <input
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onSearchEnter}
          type="text"
          placeholder="떠나고 싶은 지역이 있나요?"
          className="flex w-full h-[44px] px-[20px] items-center flex-[1_0_0] rounded-[100px] border-[0.8px] border-[var(--Gray400)] focus:outline-none focus:border-[var(--Gray900)] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[20px] placeholder:tracking-[-0.5px]"
        />
        <button
          onClick={onSearchClick}
          className="absolute w-[24px] h-[24px] top-[10px] right-5"
        >
          <SearchIcon />
        </button>
      </div>
    </section>
  );
}

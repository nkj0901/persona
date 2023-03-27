import React from 'react';
import { useRecoilValue } from 'recoil';
import { clickedFilterState } from '../states/practiceFilterState';

import FilterBtn from '../components/FilterBtn';
import style from '../styles/Practice.module.scss';

export default function Practice() {
  const clickedBtnIds = useRecoilValue(clickedFilterState);

  return (
    <div className={style.container}>
      <div className={style.banner}>
        <h1>스크립트</h1>
        <div className={style.subtitle}>내가 원하는 스크립트를 고를 수 있어요</div>
      </div>
      <div className={style.filter}>
        <div className={style.search}>
          <select name="findby">
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="work">작품</option>
            <option value="character">배역</option>
          </select>
          <input className={style.searchbar} placeholder="search" />
          <button className={style.searchbtn}>
            <img src="Header_logo.png" alt="임시버튼" width="50px" height="30px" />
          </button>
        </div>
        {clickedBtnIds.length > 0 ? <p>클릭된 버튼 아이디 : {clickedBtnIds.join(', ')}</p> : <p>아직 안눌림</p>}
        <div className={style.filterButton}>
          <FilterBtn id={1} label="전체" />
          <FilterBtn id={2} label="#슬픈" />
          <FilterBtn id={3} label="#당황한" />
          <FilterBtn id={4} label="#화난" />
          <FilterBtn id={5} label="#기쁜" />
          <FilterBtn id={5} label="#무서운" />
          <FilterBtn id={6} label="#혐오스러운" />
          <FilterBtn id={7} label="#중립" />
          <FilterBtn id={8} label="#영화" />
          <FilterBtn id={9} label="#연극" />
          <FilterBtn id={10} label="#뮤지컬" />
          <FilterBtn id={11} label="#드라마" />
        </div>
        <div className={style.options}></div>
      </div>
      <div className={style.script}>
        <div className={style.sorting}>최신순 | 인기순 | 참여순 | 조회순</div>
        <div className={style.scripts}></div>
      </div>
    </div>
  );
}

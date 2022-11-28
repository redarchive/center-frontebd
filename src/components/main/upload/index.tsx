import React from 'react'
import { Link } from 'gatsby'
import * as style from './style.module.scss'

const Upload = (): JSX.Element => {
  return (
    <>
      <Link to='/' className={style.item__back}></Link>
      <div className={style.item__container}>
          <form action="/">
            <div className={style.input__box}>
              <input type="text" placeholder='제목을 입력하세요.' />
            </div>
            <div className={style.input__box}>
              <input type="text" placeholder='만든이를 입력하세요.' />
            </div>
            <div className={style.input__box}>
              <input type="text" placeholder='github주소를 입력해주세요.' />
            </div>
            <div className={style.file__box}>
              <div>
                <p>홍보 이미지 선택(하나만)</p>
                <p>이미지 끌어다 놓거나 <label htmlFor="banner">찾아보기</label></p>
                <input type="file" id='banner'/>
              </div>
            </div>
            <div className={style.file__box}>
              <div>
                <p>스크린샷 이미지 선택(최소 4개)</p>
                <p>이미지 끌어다 놓거나 <label htmlFor="images">찾아보기</label></p>
                <input type="file" id='images'/>
              </div>
            </div>
            <div className={style.edit}>
              <textarea placeholder='500자 이하의 간단한 설명을 입력해주세요.'></textarea>
            </div>
            <div className={style.input__box}>
              <input type="text" placeholder='태그를 선택해주세요.' />
            </div>
            <div className={style.input__box}>
              <input type="text" placeholder='카테고리를 선택해주세요.' />
            </div>
            <div className={style.input__box}>
              <input type="text" placeholder='URL을 입력해주세요.' />
            </div>
            <input type="checkbox" id='check' />
            <div className={style.check__box}>
              <label htmlFor="check" className={style.checkbox}></label>
              <label htmlFor="check" className={style.label}>통합로그인 시스템 사용여부</label>
            </div>
            <div className={style.whether}>
              <div className={style.input__box}>
                <input type="text" placeholder='클라이언트 #1 이름' />
              </div>
              <div className={style.input__box}>
                <input type="text" placeholder='리다이렉트 URL #1 주소' />
              </div>
              <div className={style.input__box}>
                <input type="text" placeholder='리다이렉트 URL #2 주소' />
              </div>
              <div className={style.plus__btn}>
                리다이렉트 URL추가
              </div>
              <div className={style.check__box}>
                <label htmlFor="check" className={style.checkbox}></label>
                <label htmlFor="check" className={style.label}>실명 데이터</label>
              </div>
              <div className={style.edit}>
                <textarea placeholder='실명 데이터를 쓰는 이유 작성'></textarea>
              </div>
              <div className={style.check__box}>
                <label htmlFor="check" className={style.checkbox}></label>
                <label htmlFor="check" className={style.label}>이메일 데이터</label>
              </div>
              <div className={style.edit}>
                <textarea placeholder='이메일 데이터를 쓰는 이유 작성'></textarea>
              </div>
            </div>
            <div className={style.btn}>
              <button type='submit' className={style.upload__btn}>등록하기</button>
            </div>
          </form>
        <Link to='/' className={style.clear}>1</Link>
      </div>
    </>
  )
}

export default Upload

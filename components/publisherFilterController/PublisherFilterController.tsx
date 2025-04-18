"use client";
import React, { useLayoutEffect, useRef } from "react";
import CommonPillButton from "../common/CommonPillButton";
import TriangleArrow from "@/public/icons/triangleArrowIcon.svg";
import {
  ContentsFilterType,
  usePublisherPageFilterControllerData,
} from "@/app/(client)/(exploreHeader)/explore/publisher/PublisherPageDataProvider";
import { ModalType, usePopupAction } from "@/context/popupStore";
import BottomSheetModal from "../popupProvider/BottomSheetModal";
import AlphabetFilterSelector from "../popupProvider/alphabetFilterSelector/AlphabetFilterSelector";

const PublisherFilterController = () => {
  const { contentsfilter, setContentsFilter, alphabetFilter, setAlphabetFilter } =
    usePublisherPageFilterControllerData();
  const { openPopup, closePopup } = usePopupAction();
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const bodyElement = document.body.getBoundingClientRect();
    if (ref.current) {
      ref.current.style.width = bodyElement.width + "px";
    }
  }, []);

  const bottomSheetOpenHander = () => {
    openPopup<string>(
      <BottomSheetModal>
        <AlphabetFilterSelector />
      </BottomSheetModal>,
      closePopup,
      setAlphabetFilter,
      ModalType.BOTTOMSHEET
    );
  };

  return (
    <div className="fixed z-30 flex w-full bg-[#FFFFFFD9] pb-3 backdrop-blur-[5px]" ref={ref}>
      <div className="scrollbar-hide flex flex-row items-center justify-start gap-2 overflow-x-auto pl-5 text-xl">
        <CommonPillButton
          className={`!size-fit shrink-0 px-4 transition-colors ${
            contentsfilter?.includes(ContentsFilterType.NEWS_LETTER)
              ? "border-none bg-gradient-to-r from-[#B0B5DF] to-[#EEDBE0] !font-semibold text-white"
              : "border-gray-200 px-4 text-[var(--sub-color)]"
          }`}
          onClick={() =>
            setContentsFilter((prev) =>
              prev?.includes(ContentsFilterType.NEWS_LETTER)
                ? prev.length < 0
                  ? prev?.filter((item) => item !== ContentsFilterType.NEWS_LETTER)
                  : [ContentsFilterType.PLAY_LIST]
                : [...prev, ContentsFilterType.NEWS_LETTER]
            )
          }
        >
          뉴스레터
        </CommonPillButton>
        <CommonPillButton
          className={`!size-fit shrink-0 px-4 transition-colors ${
            contentsfilter?.includes(ContentsFilterType.PLAY_LIST)
              ? "border-none bg-gradient-to-r from-[#B0B5DF] to-[#EEDBE0] !font-semibold text-white"
              : "border-gray-200 px-4 text-[var(--sub-color)]"
          }`}
          onClick={() =>
            setContentsFilter((prev) =>
              prev?.includes(ContentsFilterType.PLAY_LIST)
                ? prev.length < 0
                  ? prev?.filter((item) => item !== ContentsFilterType.PLAY_LIST)
                  : [ContentsFilterType.NEWS_LETTER]
                : [...prev, ContentsFilterType.PLAY_LIST]
            )
          }
        >
          플레이리스트
        </CommonPillButton>
        <div className="h-3/5 w-0 border-r"></div>
        <CommonPillButton
          className="!size-fit shrink-0 border-gray-200 from-[#B0B5DF] to-[#EEDBE0] px-4 text-[var(--sub-color)] transition-colors focus:bg-gradient-to-r focus:font-semibold focus:text-white"
          onClick={bottomSheetOpenHander}
        >
          출판사명 {alphabetFilter}
          <TriangleArrow className={`flex size-4 rotate-180 items-center justify-center transition duration-300`} />
        </CommonPillButton>
      </div>
    </div>
  );
};

export default PublisherFilterController;

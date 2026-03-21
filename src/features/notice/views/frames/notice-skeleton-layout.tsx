import LandingModal from '@/features/landing/LandingModal/landing-modal';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';
import React from 'react';
import { ZaboSkeleton } from '../components/skeleton/zabo-skeleton';
import Pagination from '../components/pagination';
import { ITEMS_PER_PAGE } from '@/common/const/notice';
import { Footer } from '@/common/components';
export default function NoticeSkeletonLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingModal />
      <Navbar />
      <div className="mb-96 flex flex-1">
        <div className="sticky top-20 my-6 ml-4 hidden h-fit self-start md:block">
          <Sidebar />
        </div>

        <div className="w-0 grow md:mx-5">
          <main className="flex w-full flex-col items-center gap-5">
            <div className="flex w-full flex-col items-center">
              <div className="flex w-full flex-col md:max-w-200">
                {Array.from({ length: 10 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <ZaboSkeleton />
                    <div className="bg-greyLight dark:bg-dark_greyBorder my-7.5 h-px" />
                  </React.Fragment>
                ))}
              </div>
            </div>
            <Pagination page={20} items={2000} itemsPerPage={ITEMS_PER_PAGE} />
          </main>
          
        </div>
      </div>
      <Footer />
    </div>
  );
}

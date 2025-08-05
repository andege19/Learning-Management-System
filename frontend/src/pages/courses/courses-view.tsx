import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/courses/coursesSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const CoursesView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { courses } = useAppSelector((state) => state.courses)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View courses')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View courses')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/courses/courses-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>CourseTitle</p>
                    <p>{courses?.title}</p>
                </div>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Description</p>
                  {courses.description
                    ? <p dangerouslySetInnerHTML={{__html: courses.description}}/>
                    : <p>No data</p>
                  }
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Instructor</p>

                        <p>{courses?.instructor?.firstName ?? 'No data'}</p>

                </div>

                <>
                    <p className={'block font-bold mb-2'}>Assignments Course</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>AssignmentTitle</th>

                                <th>DueDate</th>

                            </tr>
                            </thead>
                            <tbody>
                            {courses.assignments_course && Array.isArray(courses.assignments_course) &&
                              courses.assignments_course.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/assignments/assignments-view/?id=${item.id}`)}>

                                    <td data-label="title">
                                        { item.title }
                                    </td>

                                    <td data-label="due_date">
                                        { dataFormatter.dateTimeFormatter(item.due_date) }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!courses?.assignments_course?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/courses/courses-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

CoursesView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default CoursesView;

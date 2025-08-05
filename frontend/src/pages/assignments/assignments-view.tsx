import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/assignments/assignmentsSlice'
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

const AssignmentsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { assignments } = useAppSelector((state) => state.assignments)

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
              <title>{getPageTitle('View assignments')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View assignments')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/assignments/assignments-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>AssignmentTitle</p>
                    <p>{assignments?.title}</p>
                </div>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Description</p>
                  {assignments.description
                    ? <p dangerouslySetInnerHTML={{__html: assignments.description}}/>
                    : <p>No data</p>
                  }
                </div>

                <FormField label='DueDate'>
                    {assignments.due_date ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={assignments.due_date ?
                        new Date(
                          dayjs(assignments.due_date).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No DueDate</p>}
                </FormField>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Course</p>

                        <p>{assignments?.course?.title ?? 'No data'}</p>

                </div>

                <>
                    <p className={'block font-bold mb-2'}>Submissions Assignment</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Grade</th>

                            </tr>
                            </thead>
                            <tbody>
                            {assignments.submissions_assignment && Array.isArray(assignments.submissions_assignment) &&
                              assignments.submissions_assignment.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/submissions/submissions-view/?id=${item.id}`)}>

                                    <td data-label="grade">
                                        { item.grade }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!assignments?.submissions_assignment?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/assignments/assignments-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

AssignmentsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default AssignmentsView;

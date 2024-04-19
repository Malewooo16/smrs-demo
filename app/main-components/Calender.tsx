"use client"

import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  Appointments,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
  WeekView,
  DayView
} from '@devexpress/dx-react-scheduler-material-ui';


//import { appointments } from '../../../demo-data/month-appointments';

export default function CalenderDemo(props:{timeLines:any}) {
  
 // const timeLines = await fetchWorkflowTimelines(props.emailAddress)
  //const parsedTimeLines = JSON.parse(timeLines)

  const [currentViewName, setCurrentViewName] = useState('work-week');

  const handleCurrentViewNameChange = (newViewName:any) => {
    setCurrentViewName(newViewName);
  };


  
  return (
    <Paper>
      <Scheduler  height={660}>
        <ViewState
          defaultCurrentDate="2024-02-25"
          currentViewName={currentViewName}
          onCurrentViewNameChange={handleCurrentViewNameChange}
        />

        <WeekView startDayHour={10} endDayHour={19} />
        <WeekView
          name="work-week"
          displayName="Work Week"
          excludedDays={[0, 6]}
         
        />
        <MonthView />
        <DayView />
        <Toolbar />
        <DateNavigator />
        
        <ViewSwitcher />
        <Appointments />
        <AppointmentTooltip
            showCloseButton
            showOpenButton
          />
          <AppointmentForm
            readOnly
          />
      </Scheduler>
    </Paper>
  );
};



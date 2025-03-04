'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DateTime } from 'luxon';
import { DataGrid } from '@mui/x-data-grid';
import sortingComparators from '../_utils/sortingComparators';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function ProjectList({ updateProjectList, setUpdateProjectList }) {
   const [projectList, setProjectList] = useState();
   const [error, setError] = useState();

   if (error) {
      throw error;
   }

   useEffect(function getProjectList() {
      if (projectList && !updateProjectList) {
         return;
      }

      async function fetchProjectList() {
         try {
            const fetchOptions = {
               method: 'GET',
               headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
               },
               mode: 'cors',
               credentials: 'include',
               cache: 'no-store'
            };
            const fetchURL = apiURL + '/projects';

            const res = await fetch(fetchURL, fetchOptions);
            const data = await res.json();

            if (res.ok) {
               const projectListData = data.data;   
               setProjectList(projectListData);

               if (projectList && setUpdateProjectList) {
                  setUpdateProjectList(false);
               }
            } else {
               const errors = data.errors;
               setError(new Error(errors[0]));
            }
         } catch (err) {
            setError(err);
         }
      }

      fetchProjectList();
   }, [ projectList, updateProjectList, setUpdateProjectList ]);

   var dataGridColumns = [
      { 
         field: 'name', headerName: 'Project', 
         flex: 2, minWidth: 150,
         renderCell: renderNameLink, valueGetter: (value) => value
      },
      { 
         field: 'status', headerName: 'Status', 
         flex: 0.8, minWidth: 100,
         sortComparator: sortingComparators.status 
      },
      { 
         field: 'priority', headerName: 'Priority', 
         flex: 0.8, minWidth: 80,
         sortComparator: sortingComparators.priority 
      },
      { 
         field: 'dateCreated', headerName: 'Date Created', 
         flex: 1, minWidth: 140,
         valueFormatter: (value) => DateTime.fromISO(value).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
      },
      { 
         field: 'lead', headerName: 'Lead', 
         flex: 1.5, minWidth: 150, 
         renderCell: renderLeadLink,
         valueGetter: (value) => `${value.firstName} ${value.lastName}` 
      },
      { 
         field: 'slackChannelId', headerName: 'Slack Channel ID', 
         flex: 0.2, minWidth: 150,
         valueFormatter: (value) => value ? value : 'N/A'
      }
   ];

   var dataGridRows = (projectList) 
      ?
         projectList.map(project => project)
      : 
         [];
   
   function getRowId(row) {
      return row._id;
   }

   function renderNameLink(params) {
      return (
         <Link href={'/projects/' + params.row._id}>{params.row.name}</Link>
      );
   }

   function renderLeadLink(params) {
      return (
         <Link href={'/team/' + params.row.lead._id}>
            {params.row.lead.firstName + ' ' + params.row.lead.lastName}
         </Link>
      );
   }      

   return (
      projectList &&
         <div style={{ width: '100%' }}>
            <DataGrid
               getRowId={getRowId}
               rows={dataGridRows}
               columns={dataGridColumns}
               autoHeight
               initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
               pageSizeOptions={[5,10,25,50,100]}
               checkboxSelection
               localeText={{ noRowsLabel: 'No projects to display' }}
               sx={{
                  '& .MuiDataGrid-columnHeader': {
                    backgroundColor: 'rgb(222, 244, 230)',
                    fontSize: '1.25em'
                  },
                  '& .MuiDataGrid-row': {
                     fontSize: '1.1em'
                  },
                  '& .MuiDataGrid-cell': {
                     overflow: 'scroll',
                     textOverflow: 'unset'
                  },
                  '& .MuiDataGrid-footerContainer': {
                     backgroundColor: 'rgb(229, 246, 235)'
                  }
               }}
            />
         </div>
   );
};
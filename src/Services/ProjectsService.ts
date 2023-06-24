import { ListJob, ListJobProps } from '../Model/ListJob';

export const TodoJobs = ListJob.filter((Job: ListJobProps) => Job.status === 'Todo');
export const ProcessingJobs = ListJob.filter((Job: ListJobProps) => Job.status === 'Processing');
export const DoneJobs = ListJob.filter((Job: ListJobProps) => Job.status === 'Done');

// export const individualJobs = ListJob.filter(
//     (Job: ListJobProps) => Job.type === 'Việc cá nhân' && Job.status !== 'Done',
// );
// export const groupJobs = ListJob.filter(
//     (Job: ListJobProps) => Job.type === 'Việc nhóm' && Job.status !== 'Done',
// );

export const listWorkplaceJobs: string[] = [];
ListJob.forEach((job) => {
    if (!listWorkplaceJobs.includes(job.workplace)) {
        listWorkplaceJobs.push(job.workplace);
    }
});

export const listGroupNameJobs: string[] = [];
ListJob.forEach((job) => {
    if (!listGroupNameJobs.includes(job.groupname) && job.type === 'Việc nhóm') {
        listGroupNameJobs.push(job.groupname);
    }
});

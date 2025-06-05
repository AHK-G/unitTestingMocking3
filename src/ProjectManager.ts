export interface ProjectDetails {
    id: string;
    name: string;
    manager: string;
}

export interface TaskDetails {
    title: string;
}

export interface TaskResult {
    success: boolean;
    taskId: number;
}

export interface ReportData {
    projectId: string;
    status: string;
}

export class ProjectManager {
    private taskScheduler: TaskScheduler;
    private notificationService: NotificationService;
    private reportGenerator: ReportGenerator;

    constructor(
        taskScheduler: TaskScheduler,
        notificationService: NotificationService,
        reportGenerator: ReportGenerator
    ) {
        this.taskScheduler = taskScheduler;
        this.notificationService = notificationService;
        this.reportGenerator = reportGenerator;
    }

    public initiateProject(projectDetails: ProjectDetails): string {
        const taskResult = this.taskScheduler.scheduleTask({
            title: `Initiate Project: ${projectDetails.name}`,
        });

        if (!taskResult.success) {
            throw new Error("Failed to schedule project initiation task.");
        }

        this.notificationService.sendNotification(
            projectDetails.manager,
            `Project ${projectDetails.name} initiated.`
        );

        return this.reportGenerator.generateReport({
            projectId: projectDetails.id,
            status: "Initiated",
        });
    }
}

export class TaskScheduler {
    scheduleTask(taskDetails: TaskDetails): TaskResult {
        console.log(`Task scheduled: ${taskDetails.title}`);
        return { success: true, taskId: Date.now() };
    }
}

export class NotificationService {
    sendNotification(recipient: string, message: string): void {
        console.log(`Notification sent to ${recipient}: ${message}`);
    }
}

export class ReportGenerator {
    generateReport(data: ReportData): string {
        console.log(`Report generated with data: ${JSON.stringify(data)}`);
        return `Report for Project: ${data.projectId}`;
    }
}

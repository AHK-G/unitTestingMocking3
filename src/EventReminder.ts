export interface Event {
    id: string;
    title: string;
    date: string;
    userId: string;
}

export interface EventRepository {
    getEventsBetweenDates(start: Date, end: Date): Promise<Event[]>;
}

export interface NotificationService {
    sendNotification(userId: string, message: string): Promise<void>;
}

export class EventReminder {
    private notificationService: NotificationService;
    private eventRepository: EventRepository;

    constructor(notificationService: NotificationService, eventRepository: EventRepository) {
        this.notificationService = notificationService;
        this.eventRepository = eventRepository;
    }

    public async sendUpcomingEventNotifications(): Promise<void> {
        const today = new Date();
        const nextWeek = new Date(today.getTime());
        nextWeek.setDate(today.getDate() + 7);

        const events = await this.eventRepository.getEventsBetweenDates(today, nextWeek);

        for (const event of events) {
            const eventDate = new Date(event.date);
            const message = `Reminder: Your event '${event.title}' is coming up on ${eventDate.toISOString().split('T')[0]}.`;
            await this.notificationService.sendNotification(event.userId, message);
        }
    }
}

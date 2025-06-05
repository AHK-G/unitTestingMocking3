export interface UserDetails {
    email: string;
    name: string;
}

export interface EmailResult {
    success: boolean;
    message: string;
}

export class UserManager {
    private emailService: EmailService;

    constructor(emailService: EmailService) {
        this.emailService = emailService;
    }

    public addUser(userDetails: UserDetails): string {
        if (!userDetails.email || !userDetails.name) {
            throw new Error("User details must include an email and a name.");
        }

        const emailResult = this.emailService.sendWelcomeEmail(userDetails.email, userDetails.name);

        if (!emailResult.success) {
            throw new Error(emailResult.message);
        }

        return `User ${userDetails.name} added successfully. ${emailResult.message}`;
    }
}

export class EmailService {
    public sendWelcomeEmail(emailAddress: string, userName: string): EmailResult {
        console.log(`Attempting to send welcome email to ${emailAddress} for user ${userName}`);

        if (emailAddress.endsWith("@sportradar.com")) {
            return { success: true, message: "Email sent successfully to company email." };
        }

        return { success: false, message: "Email failed to send due to invalid domain." };
    }
}

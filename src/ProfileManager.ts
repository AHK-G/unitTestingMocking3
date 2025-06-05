import * as fs from 'fs-extra';

export type ProfileData = Record<string, any>;

export class ProfileManager {
    private jsonStorage: JsonStorage;

    constructor(jsonStorage: JsonStorage) {
        this.jsonStorage = jsonStorage;
    }

    public getProfile(profileId: string): ProfileData | null {
        const profiles = this.jsonStorage.readJson();
        return profiles[profileId] || null;
    }

    public updateProfile(profileId: string, profileData: ProfileData): ProfileData {
        const profiles = this.jsonStorage.readJson();
        profiles[profileId] = profileData;
        this.jsonStorage.writeJson(profiles);
        return profiles[profileId];
    }
}

export class JsonStorage {
    private readonly filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    public readJson(): Record<string, ProfileData> {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data);
    }

    public writeJson(data: Record<string, ProfileData>): void {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(this.filePath, jsonData, 'utf8');
    }
}

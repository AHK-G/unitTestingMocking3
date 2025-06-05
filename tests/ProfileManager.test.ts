import * as fs from "fs-extra";
import {
  ProfileManager,
  JsonStorage,
  ProfileData,
} from "../src/ProfileManager";

// JSON Example
// {
//   "1": {"name": "Bob", "age": 34}
// }

describe("JSON Storage", () => {
  it("should read data from a specificic file path", () => {
    const dummyFilePath = "";
    const fsSpy = jest.spyOn(fs, "readFileSync");
    const dummyData: Record<string, ProfileData> = {
      "1": { name: "Bob" },
    };
    fsSpy.mockReturnValue([""]);

    const jsonStorage = new JsonStorage(dummyFilePath);

    const data = jsonStorage.readJson();

    expect(data).toStrictEqual(dummyData);
  });
});

import {test,expect,request} from "@playwright/test";

let apiContext: any;

test.beforeEach(async () => {
  apiContext = await request.newContext({
    baseURL: 'https://api.demoblaze.com',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  });
});

test.afterEach(async () => {
  await apiContext.dispose();
});

test('entries reposense', async () => {
    const response = await apiContext.get("/entries");
    const responseBody = await response.json();

    expect(responseBody).toHaveProperty("Items");
    expect(Array.isArray(responseBody.Items)).toBe(true);
    expect(responseBody.Items).toHaveLength(9);
    expect(responseBody).toHaveProperty("LastEvaluatedKey");
});

test('bycat - phone', async () => {
    const response = await apiContext.post("/bycat",
        {data: {"cat":"phone"}})
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty("Items");
    expect(Array.isArray(responseBody.Items)).toBe(true);
    expect(responseBody.Items).toHaveLength(7);
});

test('bycat - notebook', async () => {
    const response = await apiContext.post("/bycat",
        {data: {"cat":"notebook"}})
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty("Items");
    expect(Array.isArray(responseBody.Items)).toBe(true);
    expect(responseBody.Items).toHaveLength(6);
});

test('bycat - monitor', async () => {
    const response = await apiContext.post("/bycat",
        {data: {"cat":"monitor"}})
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty("Items");
    expect(Array.isArray(responseBody.Items)).toBe(true);
    expect(responseBody.Items).toHaveLength(2);
});

test('bycat - non-existing category', async () => {
    const response = await apiContext.post("/bycat",
        {data: {"cat":"non-existing-category"}})
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty("Items");
    expect(Array.isArray(responseBody.Items)).toBe(true);
    expect(responseBody.Items).toHaveLength(0);
});
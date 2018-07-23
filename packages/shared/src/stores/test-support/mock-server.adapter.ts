export class MockServerAdapter {
    reset(): Promise<any> {
        return Promise.resolve({ statusCode: 200 });
    }
}

import { RecoModule } from './reco.module';

describe('RecoModule', () => {
  let recoModule: RecoModule;

  beforeEach(() => {
    recoModule = new RecoModule();
  });

  it('should create an instance', () => {
    expect(recoModule).toBeTruthy();
  });
});

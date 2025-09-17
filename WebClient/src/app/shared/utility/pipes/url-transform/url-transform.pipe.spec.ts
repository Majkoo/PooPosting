import { UrlTransformPipe } from './url-transform.pipe';
import {environment} from "../../../../../environments/environment";

describe('UrlTransformPipe', () => {
  let pipe: UrlTransformPipe;

  beforeEach(() => {
    pipe = new UrlTransformPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the input string unchanged if it starts with "http://"', () => {
    const input = 'http://example.com';
    expect(pipe.transform(input)).toEqual(input);
  });

  it('should return the input string unchanged if it starts with "https://"', () => {
    const input = 'https://example.com';
    expect(pipe.transform(input)).toEqual(input);
  });

  it('should transform a string starting with "wwwroot/"', () => {
    const input = 'wwwroot/pictures/kusek.png';
    const expected = `${environment.apiUrl}/${input}`;
    expect(pipe.transform(input)).toEqual(expected);
  });

  it('should transform a string starting with "wwwroot\\" using forward slashes', () => {
    const input = 'wwwroot\\pictures\\3oplumjk-s3t.webp';
    const expected = `${environment.apiUrl}/wwwroot/pictures/3oplumjk-s3t.webp`;
    expect(pipe.transform(input)).toEqual(expected);
  });

  it('should return an empty string if the input is empty', () => {
    const input = '';
    expect(pipe.transform(input)).toEqual('');
  });

  it('should return an empty string if the input is null', () => {
    const input = null;
    expect(pipe.transform(input)).toEqual(null);
  });

  it('should return an empty string if the input is undefined', () => {
    const input = undefined;
    expect(pipe.transform(input)).toEqual(undefined);
  });
});

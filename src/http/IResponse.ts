export interface IResponse {
    Resolve(value:any) :void;
    Data:string;
    json(...args: any[]) :void;
    text(...args: any[]) :void;
    css(...args: any[])  :void;
    html(...args: any[]) :void;
}

export interface LoadingProps {
  isLoading: boolean;
}
export const Loading = (props: LoadingProps): JSX.Element => (
  <div className={`${props.isLoading ? "block" : "hidden"} absolute w-full h-full bg-neutral-600 flex top-0 left-0`}>
    <div>Loading...</div>
  </div>
)

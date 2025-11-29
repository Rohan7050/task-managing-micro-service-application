import { listSchema, type ListFormType } from "@/schema/listFormSchema";
import { useActiveListFormStore } from "@/store/list.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

interface ListFormProps {
  fullWidth?: boolean;
  listData: { id: string, name: string, desc: string, board: string }
}


const ListForm: React.FC<ListFormProps> = ({ fullWidth, listData }) => {
  console.log('listData', listData)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListFormType>({
    resolver: zodResolver(listSchema),
    defaultValues: {
      name: listData.name,
      desc: listData.desc,
    },
  });

  const onSubmit: SubmitHandler<ListFormType> = (data) => {
    console.log({ ...data, id: listData.board });
  };

  const { closeListForm } = useActiveListFormStore()



  const handleClose = () => {
    closeListForm();
  }
  return (
    <div
      className={fullWidth ? "bg-[#101204] rounded-md w-full" : "bg-[#101204] rounded-md w-full md:w-1/3 lg:w-1/5 shrink-0"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="gird grid-cols-1 gap-y-6 gap-x-8 m-3">
        <div className="pb-3">
          <div className="mt-2.5">
            <input
              {...register("name", {
                maxLength: 20,
                minLength: 5,
                required: true,
              })}
              type="text"
              name="name"
              placeholder="Enter List Name"
              className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-offset-2 focus:outline-indigo-500"
            />
            {errors.name && (
              <p className="text-red-300 text-start text-sm mt-1">
                Invalid Name (must be 5 to 20 charactor long)
              </p>
            )}
          </div>
        </div>
        <div>
          <div className="mt-2.5">
            <input
              {...register("desc", {
                maxLength: 20,
                minLength: 5,
                required: true,
              })}
              type="text"
              name="desc"
              placeholder="Enter List Descreption"
              className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-offset-2 focus:outline-indigo-500"
            />
            {errors.desc && (
              <p className="text-red-300 text-start text-sm mt-1">
                Invalid Descreption (must be 5 to 20 charactor long)
              </p>
            )}
          </div>
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleClose}
            className="block w-full rounded-md bg-gray-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
          >
            Close
          </button>
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default ListForm
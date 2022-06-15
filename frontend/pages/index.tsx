import type { NextPage } from "next";
import { useEffect } from "react";
import { AppHead } from "../components/Head";
import { useGithubRepositories } from "../libs/github";
import { Repositorie } from "../libs/repositorie";
import { test as repositories } from "../libs/github/result";

const Home: NextPage = () => {
  return (
    <div className="bg-teal-700 flex justify-center h-screen items-center">
      <div className="card container max-w-screen-md mx-auto p-1">
        <div className="bg-blue-900 text-white p-1 text-center mb-2">
          Search repositories
        </div>
        <div className="flex -mb-1">
          <div className="card p-2 rounded border-b-transparent">
            Search repositories
          </div>
          <div className="card p-2 rounded border-b-transparent mb-1">
            My favorites
          </div>
        </div>
        <div className="p-2 card z-10 flex-wrap flex">
          <label htmlFor="name" className="w-full">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mb-5 border border-black p-1 w-full"
          />
          <label htmlFor="name" className="w-full">
            Language:
          </label>
          <select
            name="language"
            id="language"
            className="mb-5 border border-black p-1 w-9/12"
          >
            <option value="python">Python</option>
          </select>
          <div className="btn btn-primary h-fit mx-auto p-1 w-2/12 mx-auto text-center">
            Pesquisar
          </div>
          <div className='w-full mb-1'>Select the repositories you want to favorite:</div>
          <div className="card w-full bg-white p-1">
            <table>
              <thead>
                <tr>
                  <td className='card p-1'>Name</td>
                  <td className='card p-1'>Description</td>
                  <td className='card p-1'>Creation date</td>
                  <td className='card p-1'>Fav</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='p-1 bg-slate-100'>Tencent/tencent-ml-images</td>
                  <td className='p-1 bg-slate-100'>Largest multi-label image database; ResNet-101 model; 80.73% top-1 acc on ImageNet</td>
                  <td className='p-1 bg-slate-100'>2018-10-15T02:29:22Z</td>
                  <td className='p-1 text-center btn btn-primary text-yellow-500 text-2xl active t-shadow'>★</td>
                </tr>
                <tr>
                  <td className='p-1'>Tencent/tencent-ml-images</td>
                  <td className='p-1'>Largest multi-label image database; ResNet-101 model; 80.73% top-1 acc on ImageNet</td>
                  <td className='p-1'>2018-10-15T02:29:22Z</td>
                  <td className='p-1 text-center btn btn-primary text-yellow-100 text-2xl t-shadow'>★</td>
                </tr>
                <tr>
                  <td className='p-1'>Tencent/tencent-ml-images</td>
                  <td className='p-1'>Largest multi-label image database; ResNet-101 model; 80.73% top-1 acc on ImageNet</td>
                  <td className='p-1'>2018-10-15T02:29:22Z</td>
                  <td className='p-1 text-center btn btn-primary text-yellow-100 text-2xl t-shadow'>★</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <div className="card max-w-screen-sm absolute w-full z-50">
        <div className="bg-blue-900 text-white p-1 text-center mb-2 flex justify-between items-center pl-4">
          Login
          <div className='btn btn-primary p-1'>x</div>
        </div>
        <div className='flex p-5'>
          <div className='flex flex-col w-2/4 pr-4'>
            <div className='text-center'>Sign in</div>
            <label htmlFor="email">
              Email:
            </label>
            <input type="email" name="email" id="email" placeholder='Your email' className='mb-4 p-1 border border-black' />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" placeholder='Your password' className='mb-4 p-1 border border-black' />
            <div className='btn btn-primary p-1 text-center'>Login</div>
          </div>
          <div className='flex flex-col w-2/4 pl-4'>
            <div className='text-center'>Sign up</div>
            <label htmlFor="email">
              Email:
            </label>
            <input type="email" name="email" id="email" placeholder='Your email' className='mb-4 p-1 border border-black' />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" placeholder='Your password' className='mb-4 p-1 border border-black' />
            <label htmlFor="password">Repeat password:</label>
            <input type="password" name="password" id="password" placeholder='Your password' className='mb-4 p-1 border border-black' />
            <div className='btn btn-primary p-1 text-center'>Register</div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;

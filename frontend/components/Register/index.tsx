import { Container, Position, Size } from "../Container";

export const RegisterContainer = () => (
  <Container
    position={Position.ABSOLUTE}
    size={Size.SMALL}
    title="Register"
  >
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
  </Container>
)

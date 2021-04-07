import Image from 'next/image';

export default function Index() {
  const authURL = process.env.NEXT_PUBLIC_AUTH_URL;

  return (
    <div className="p-16">
      <h1 className="text-gray-900 text-2xl pb-2 font-bold md:text-3xl">One Story Exhibit Dashboard</h1>
      <p className="text-gray-900 text-lg font-medium">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dictum ante velit, id tempus massa
        scelerisque at. Donec ullamcorper arcu leo, a interdum dolor maximus quis. Sed vulputate nibh et quam elementum
        eleifend. Vestibulum ac rhoncus metus, et imperdiet justo. Quisque aliquam rhoncus dolor, sit amet bibendum
        felis pharetra et. Aliquam imperdiet malesuada congue. Nunc ultricies justo lacus, id commodo nunc ullamcorper
        non. Pellentesque nisl enim, cursus vitae orci ac, iaculis dapibus dui. Duis venenatis nulla eu suscipit ornare.
        Mauris nec dignissim ex.
      </p>
      <div className="flex justify-items-center mt-24 items-center">
        <div className="bg-gray-900 h-96 w-full rounded-md"></div>
      </div>
      <div className="mt-24 bg-gray-900 rounded-md p-16 flex flex-row justify-between">
        <div className="w-2/4">
          <h2 className="text-gray-100 text-2xl font-bold">Responsible for an One Story Exhibit model?</h2>
          <h3 className="text-gray-100 text-xl font-medium">Sign in here and get your model featured</h3>
          <p className="text-gray-100 text-md font-medium mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dictum ante velit, id tempus massa
            scelerisque at. Donec ullamcorper arcu leo, a interdum dolor maximus quis. Sed vulputate nibh et quam
            elementum eleifend. Vestibulum ac rhoncus metus, et imperdiet justo. Quisque aliquam rhoncus dolor, sit amet
            bibendum felis pharetra et. Aliquam imperdiet malesuada congue. Nunc ultricies justo lacus, id commodo nunc
            ullamcorper non. Pellentesque nisl enim, cursus vitae orci ac, iaculis dapibus dui. Duis venenatis nulla eu
            suscipit ornare. Mauris nec dignissim ex.
          </p>
          <div className="flex flex-row justify-center items-center">
            <a href={authURL} className=" text-gray-100 bg-blue-500 py-2 px-4 mt-4 font-bold text-lg rounded-md">
              Sign in with Netilion
            </a>
          </div>
        </div>
        <div className="relative w-1/3 h-80">
          <Image
            src="/OSEModel.png"
            alt="Picture of the One Story Exhibit Model in Reinach, Switzerland"
            layout="fill"
            objectFit="cover"
            priority="true"
          />
        </div>
      </div>
    </div>
  );
}

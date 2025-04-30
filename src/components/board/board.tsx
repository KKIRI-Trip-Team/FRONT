// interface DummyDataType {
//   id: number;
//   title: string;
//   content: string;
// }

// export async function DummyComponent() {
//   const response = await fetch(
//     'http://15.164.44.157:8080/api/feeds/dummylist',
//     {
//       cache: 'no-store',
//     },
//   );

//   console.log('상태코드:', response.status);

//   if (!response.ok) {
//     const text = await response.text();
//     console.error('에러 응답 내용:', text);
//     throw new Error('에러가 발생했습니다');
//   }
//   const data: DummyDataType[] = await response.json();

//   return (
//     <div className="p-4">
//       {data.map((dummy) => (
//         <div key={dummy.id} className="mb-4 border p-4 rounded shadow">
//           <h1 className="text-lg font-bold">{dummy.title}</h1>
//           <p>{dummy.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

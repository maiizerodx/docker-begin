function Mongo(props) {
  return (
    <>
      <h1>{props.isConnect? "Connected":"Fail to connect"}</h1>
    </>
  );
}

export default Mongo;

import mongoose from "mongoose";
export async function getServerSideProps({ req, res }) {
    let isConnect =false;
    let containerAddreess = 'mongodb';
 await  mongoose.connect(
    `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${containerAddreess}:27017/database?authSource=admin`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        isConnect=false;
        console.error("FAILED TO CONNECT TO MONGODB");
        console.error(err);
      } else {
        isConnect=true
        console.log("CONNECTED TO MONGODB!!");
        //app.listen(80);
      }
    }
  );
  return { props: {  isConnect } };
}

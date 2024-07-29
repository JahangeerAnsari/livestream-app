import Toggle from "./toggle";
import Wrapper from "./wrapper";

const Sidebar = () => {
 // in return we are going to pass server-component inside client-component in wrapper
 return ( 
  <Wrapper>
  <Toggle/>
  </Wrapper>
  );
}
 
export default Sidebar;
{/* <Wrapper>
kuch v likjenge wrapper me show hoga because its child wrapper
</Wrapper> */}

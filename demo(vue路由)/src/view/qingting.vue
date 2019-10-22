<template>
  <div id="home">
    <form>
      <div class="biaodan">
          <ul class="one form-group" >
            <li><label for="Url">Url:</label></li>
            <li><label for="id">Id: </label></li>
            <li><label for="title">Title:</label></li>
            <li><label for="Tag">Tag:</label></li>
            <li><label for="CheckCode"> CheckCode:</label></li>
          </ul>
          <ul class="two">
            <li><input type="text" class="form-control" name="Url"/></li>
            <li><input type="text" class="form-control" name="id"/></li>
            <li><input type="text" class="form-control" name="title"/></li>
            <li><input type="text" class="form-control" name="Tag"/></li>
            <li><input type="text" class="form-control" name="CheckCode"/></li>
          </ul>
      </div>
      <div class="ad">
      			<input type="text" v-model="xinxi" @keyup.enter="add"/>
            <input type="button" value="添加" @click="add()" class="ds"/>
      			 <h3 v-for='item in list' :style="{border:'1px solid red',height:'30px'}">{{item.info}}</h3>
      		</div>
    </form>
  </div>
</template>
<script>
  export default {
    data(){
		return{
			xinxi:'',
			list:[
						{info:'宝马'},
						{info:'奔驰'},
					]
		}
     
    },
     methods:{
       add(){
		   if(this.xinxi!=''){
			   this.list.push({info:this.xinxi});
			   this.xinxi=""
		   }else{
			   alert('不能为空')
		   }
           
       }
     }
  };
</script>

<style>
  #home{
    width: 100%;
    height: 45.8rem;
    font-size:0.75rem;
    font-family: "微软雅黑";
    position: relative;
  }
  form{
    width: 100%;
    margin-top: -1.25rem;
  }
 .one{
    position: absolute;
     list-style: none;
     width: 100%;
     margin-left: -2.75rem;
  }
  .one>li{
    margin-top: 1.25rem;
    float: left;
    width: 20%;
    height: 1.875rem;
    line-height: 1.875rem;
  }
  .two{
     position: absolute;
     list-style: none;
     width: 100%;
     margin-left: -2.75rem;
     top: 2.15rem;
   }
  .two>li{
    margin-top: 1.25rem;
    float: left;
    width: 20%;
    height: 1.875rem;
  }
  ul>li>input{
    width: 100%;
    height: 1.25rem;
  }
  .tian{
    position: relative;
    width: 4.375rem;
    height: 1.5625rem;
    text-align: center;
    top: 10rem;
    line-height: 1.5625rem;
    margin-left: 4.8rem;
    background-color: lightgray;
    border: 0rem;
  }
  .ad{
    position: relative;
    top: 12.5rem;
  }
</style>

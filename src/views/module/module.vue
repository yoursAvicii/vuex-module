<template>
    <div>   
        模块一{{myname}}
    </div>
</template>
<script>
export default {
    name:"module1",
    isVuex:true,
    data(){
        return{
            myname:''
        }
    },
    created(){
        console.log(2);
        try{
            console.log(this.$store.state);
            this.myname = this.$store.state.module1.name;
        }catch{
            console.log('还未获取')
        }
        
    },
    
}
</script>
<template>
	<view class="uni-indexed">
		<scroll-view :scroll-into-view="scrollViewId" :style="{ height: winHeight + 'px' }" class="uni-indexed__list" scroll-y>
			<block v-for="(list, idx) in lists" :key="idx">
				<view v-if="list.items && list.items.length > 0" :id="'uni-indexed-list-' + list.key" class="uni-indexed__list-title">{{ list.key }}</view>
				<view v-if="list.items && list.items.length > 0" class="uni-list">
					<view v-for="(item, index) in list.items" :key="index" class="uni-list-item" hover-class="uni-list-item--hover">
						<view class="uni-list-item__container" @click="onClick(idx, index)">
              <view class="img">{{ item.imageUrl }}</view>
							<view v-if="showSelect" style="margin-right: 20upx;">
								<uni-icon :type="item.checked ? 'checkbox-filled' : 'circle'" :color="item.checked ? '#007aff' : '#aaa'" size="24" />
							</view>
							<view class="uni-list-item__content">{{ item.name }}</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view
			:class="touchmove ? 'active' : ''"
			class="uni-indexed__menu"
			@touchstart="touchStart"
			@touchmove.stop.prevent="touchMove"
			@touchend="touchEnd"
		>
			<text
				v-for="(list, key) in lists"
				:key="key"
				:class="touchmoveIndex == key ? 'active' : ''"
				class="uni-indexed__menu-item"
			>
				{{ list.key }}
			</text>
		</view>
		<view v-if="touchmove" class="uni-indexed--alert">{{ lists[touchmoveIndex].key }}</view>
	</view>
</template>
<script>
import uniIcon from '../uni-icon/uni-icon.vue';
export default {
	name: 'UniIndexedList',
	components: {
		uniIcon
	},
	props: {
		options: {
			type: Array,
			default() {
				return [];
			}
		},
		showSelect: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			lists: [],
			touchmove: false,
			touchmoveIndex: -1,
			itemHeight: 0,
			winHeight: 0,
			scrollViewId: ''
		};
	},
	created() {
		let winHeight = uni.getSystemInfoSync().windowHeight;
		this.itemHeight = winHeight / this.options.length;
		this.winHeight = winHeight;
		this.lists = this.options.map(value => {
      let items = value.data.map(item => {
        let obj = {};
        // for (let key in item) {
          obj['key'] = value.letter;
          obj['name'] = item.name
          obj['imgUrl'] = item.imgUrl
        // }
        obj.checked = item.checked ? item.checked : false;
        return obj;
      });
      return {
        title: value.letter,
        key: value.letter,
        items: items
      };
    });
	},
	methods: {
		touchStart(e) {
			this.touchmove = true;
			let pageY = e.touches[0].pageY;
			let index = Math.floor(pageY / this.itemHeight);
			let item = this.lists[index];
			if (item) {
				this.scrollViewId = 'uni-indexed-list-' + item.key;
				this.touchmoveIndex = index;
			}
		},
		touchMove(e) {
			let pageY = e.touches[0].pageY;
			let index = Math.floor(pageY / this.itemHeight);
			let item = this.lists[index];
			if (item) {
				this.scrollViewId = 'uni-indexed-list-' + item.key;
				this.touchmoveIndex = index;
			}
		},
		touchEnd() {
			this.touchmove = false;
			this.touchmoveIndex = -1;
		},
		onClick(idx, index) {
			let obj = {};
			for (let key in this.lists[idx].items[index]) {
				obj[key] = this.lists[idx].items[index][key];
			}
      console.log(obj)
			let select = [];
			if (this.showSelect) {
				this.lists[idx].items[index].checked = !this.lists[idx].items[index].checked;
				this.lists.forEach((value, idx) => {
					value.items.forEach((item, index) => {
						if (item.checked) {
							let obj = {};
							for (let key in this.lists[idx].items[index]) {
								obj[key] = this.lists[idx].items[index][key];
							}
							select.push(obj);
						}
					});
				});
			}
			this.$emit('click', {
				item: obj,
				select: select
			});
		}
	}
};
</script>
<style lang="scss">
.uni-list {
	// background-color: $uni-bg-color;
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
	&-item {
		font-size: $uni-font-size-lg;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		&__container {
			height: 150upx;
			width: 100%;
			box-sizing: border-box;
			flex: 1;
			position: relative;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
		}
    .img{
      height: 100upx;
      width: 100upx;
      background: #ccc;
      margin-right: 40upx;
    }
	}
}

.uni-indexed {
	display: flex;
	flex-direction: row;

	&__list {
		flex: 1;
		height: 100%;

		&-title {
			padding: 10upx 24upx;
			line-height: 1.5;
			background-color: #f7f7f7;
			font-size: $uni-font-size-sm;
		}
	}
  .uni-indexed__menu{
    background: #fff;
    font-weight: bold;
    position: absolute;
    top: 88upx;
    right: 20upx;
    height: calc(100% - 130upx);
    .uni-indexed__menu-item{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #151515;
    }
  }
	&__menu {
		width: 46upx;
		height: 100%;
		display: flex;
		flex-direction: column;

		&.active {
			.uni-indexed__menu-item {
        flex: 1;
				color: #151515;
        
				&.active {
					color: #F4433D;
				}
			}
		}

		&-item {
			color: #aaa;
			font-size: 22upx;
			text-align: center;
		}
	}

	&--alert {
		position: absolute;
		z-index: 20;
		width: 160upx;
		height: 160upx;
		left: 50%;
		top: 50%;
		margin-left: -80upx;
		margin-top: -80upx;
		border-radius: 80upx;
		text-align: center;
		line-height: 160upx;
		font-size: 70upx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.5);
	}
}
</style>

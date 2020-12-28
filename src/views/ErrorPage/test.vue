<template>
  <div class="create-archive-panel">
    <div class="from-container">
      <div class="nav-title">
        {{
          openMode === 1 ? "新建项目" : openMode === 2 ? "编辑项目" : "查看项目"
        }}
        <Icon type="md-close" @click="close" class="icon-close" />
      </div>
      <div class="from-content">
        <Form
          class="archive-form"
          ref="archiveForm"
          :model="archiveForm"
          :rules="ruleArchiveForm"
          :label-width="100"
        >
          <FormItem label="项目编号:" prop="prjCode">
            <Input v-model="archiveForm.prjCode" disabled />
          </FormItem>
          <FormItem label="规划名称:" prop="prjName">
            <Input v-model="archiveForm.prjName" :disabled="disabled" />
          </FormItem>
          <FormItem label="设计单位:" prop="department">
            <Input v-model="archiveForm.department" :disabled="disabled" />
          </FormItem>
          <FormItem label="具体规划:" prop="rangeDetail">
            <Input
              v-model="archiveForm.rangeDetail"
              type="textarea"
              :disabled="disabled"
            />
          </FormItem>
          <FormItem label="编制主体:" prop="bzzt">
            <Input v-model="archiveForm.bzzt" :disabled="disabled" />
          </FormItem>
          <FormItem label="规划范围:" prop="prjRange">
            <Select
              v-model="archiveForm.prjRange"
              :disabled="disabled"
              style="width:95%"
            >
              <Option
                v-for="item in prjRangeList"
                :value="item.name"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="编制状态:" prop="phase">
            <Select
              v-model="archiveForm.phase"
              :disabled="disabled"
              style="width:95%"
            >
              <Option
                v-for="item in phaseList"
                :value="item.name"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="规划批准时间:">
            <DatePicker
              :type="datePickerType"
              placeholder="请选择规划批准时间"
              v-model="ArchiveDate"
              :disabled="disabled"
              @on-change="dateChange"
              style="width: 70%"
            >
            </DatePicker>
            <Select
              v-model="dateType"
              :disabled="disabled"
              style="width:25%"
              @on-change="dateTypeChange"
            >
              <Option
                v-for="item in dateTypeList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </FormItem>
        </Form>
        <div class="btn-container">
          <Button @click="resetForm" :disabled="disabled">重置</Button>
          <Button
            class="cancel-btn"
            type="error"
            @click="close"
            :disabled="disabled"
            >取消</Button
          >
          <Button
            type="primary"
            :loading="loading"
            @click="createArchive"
            :disabled="disabled"
            >保存</Button
          >
        </div>
      </div>
    </div>
    <div class="map-container">
      <div class="map-nav" v-if="!disabled">
        绘制项目范围线
        <!-- <span v-if="!openMode" class="prompt">（红线为项目初始范围线）</span> -->
        <NrRangeSelect
          v-if="mapStatus"
          :rangeList="['region', 'draw', 'click', 'file']"
          :isContainMun="true"
          :supportWkids="supportWkids"
          ref="rangeSelect"
        ></NrRangeSelect>
        <Button class="map-nav-btn" @click="changeShow"
          >选择项目绘制方式</Button
        >
        <!-- <Button class="map-nav-btn" @click="saveRange" type="primary">保存范围线</Button> -->
        <Button class="map-nav-btn" @click="clear" type="error"
          >清除绘制范围线</Button
        >
      </div>
      <div class="map-box">
        <eyemap-map
          v-if="baseLayerUrls.length > 0"
          ref="eyeMap"
          :baseLayerUrls="baseLayerUrls"
          :extent="extent"
          :tileInfo="tileInfo"
          :fullMap="fullMap"
          :basemapToggle="basemapToggle"
          :fullScreen="fullScreen"
          :eventBus="eventBus"
          :legend="legend"
          @map-ready="mapReady"
        />

        <Modal
          v-model="isShow"
          title="绘制范围线(四选一)"
          width="350"
          draggable
          scrollable
          footer-hide
        >
          <NrRangeSelect
            v-if="mapStatus"
            :rangeList="['region', 'draw', 'click', 'file']"
            :isContainMun="true"
            :supportWkids="supportWkids"
            ref="rangeSelect"
          ></NrRangeSelect>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
import {
  createArchive,
  updateArchive,
  featuresToDatabase,
  deleteFeatures,
  getMapConfig,
  getConfiguratemManagerConfig
} from "@/api/fzsc";
import EventBus from "@/utils/EventBus";
import { YZT_MAP_OBJECT } from "@/store/types";
// import loadModules from "@/utils/loadModules";

export default {
  name: "CreateArchivePanel",
  props: {
    openMode: {
      type: Number,
      default: 1
    },
    compileArchiveForm: {
      type: Object,
      default: () => {}
    },
    level: {
      type: Number,
      default: 0
    },
    prjCode: {
      type: String,
      default: ""
    },
    prjRangeList: {
      type: Array,
      default: () => []
    },
    phaseList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      ArchiveDate: "", // 规划批准时间
      dateTypeList: [
        {
          value: "date",
          label: "年/月/日"
        },
        {
          value: "month",
          label: "年/月"
        },
        {
          value: "year",
          label: "年"
        }
      ],
      datePickerType: "date",
      dateType: "",
      archiveForm: {
        prjCode: "",
        prjName: "",
        prjRange: "",
        rangeDetail: "",
        bzzt: "",
        phase: "",
        level: "",
        department: "",
        polygon: null,
        prjType: "",
        bzzqst: "",
        bzzqed: "",
        ghpzsj: ""
      },
      ruleArchiveForm: {
        prjCode: [
          { required: true, message: "项目编号不能为空", trigger: "blur" }
        ],
        prjName: [
          { required: true, message: "规划名称不能为空", trigger: "blur" }
        ],
        phase: [
          { required: true, message: "请选择项目编制状态", trigger: "change" }
        ]
      },
      baseLayerUrls: [],
      extent: {},
      tileInfo: {},
      fullMap: true,
      basemapToggle: false,
      fullScreen: true,
      eventBus: EventBus,
      legend: true,
      isShow: false,
      mapStatus: false,
      isSaveRange: false, // 是否保存范围线
      loading: false,
      disabled: false, // 是否禁用，当且只有 查看项目 的时候为true
      mapComponent: null,
      mapQueryRusult: null,
      rings: null, // 存入空间库的范围线
      supportWkids: [] // 支持上传文件坐标系
    };
  },
  watch: {
    dateType(val, oldVal) {
      console.log("新旧值 ==> ", val, oldVal);
      this.datePickerType = val;
    }
  },
  async created() {
    const CMConfig = await getConfiguratemManagerConfig();
    this.supportWkids = CMConfig.supportWkids;
    console.log("CMConfig ==> ", CMConfig, this.supportWkids);
  },
  mounted() {
    if (this.openMode === 1) {
      // 新建项目模式下
      this.disabled = false;
      this.archiveForm.level = this.level;
      this.archiveForm.prjCode = this.prjCode;
      this.archiveForm.prjType = this.$route.meta.mark;
      this.dateType = "date";
    } else {
      // 编辑或查看项目模式下
      if (this.openMode === 2) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }

      this.archiveForm = this.compileArchiveForm;
      console.log("lll ==> ", this.archiveForm);
      if (
        this.archiveForm.ghpzsj &&
        this.archiveForm.ghpzsj.split("-").length == 1
      ) {
        this.dateType = "year";
      } else if (
        this.archiveForm.ghpzsj &&
        this.archiveForm.ghpzsj.split("-").length == 2
      ) {
        this.dateType = "month";
      } else if (
        this.archiveForm.ghpzsj &&
        this.archiveForm.ghpzsj.split("-").length == 3
      ) {
        this.dateType = "date";
      }
      this.ArchiveDate = this.archiveForm.ghpzsj;
    }
    this.baseLayerUrls = this.$store.getters.baseLayerUrls;
    console.log("this.baseLayerUrls ==> ", this.baseLayerUrls);
    this.extent = this.$store.getters.extent;
    this.tileInfo = this.$store.getters.tileInfo;
  },
  methods: {
    close() {
      console.log("触发了呀");
      this.$emit("closeCreateArchive", false);
    },
    // 选择编制周期日期发生变化时
    dateChange(date, type) {
      if (!date) {
        console.log("date, type ==> ", date, type);
        this.archiveForm.ghpzsj = "";
        this.dateType = "date";
        return;
      }
      this.archiveForm.ghpzsj = date;
      console.log("日期 ==> ", date, type);
    },
    dateTypeChange() {
      this.ArchiveDate = "";
    },
    // 重置表单
    resetForm() {
      this.$refs.archiveForm.resetFields();
      this.ArchiveDate = "";
      console.log("重置表单");
      this.dateChange();
      this.archiveForm.prjCode = this.prjCode;
      console.log("??? ==> ", this.archiveForm);
    },
    // 点击新建项目确认按钮
    createArchive() {
      console.log("点击了新建项目确认按钮 ==> ", this.archiveForm);
      this.$refs.archiveForm.validate(async valid => {
        if (valid) {
          await this.saveRange();
          if (!this.isSaveRange) {
            // this.$Message.warning("请先绘制项目范围线");
            return;
          }
          if (this.openMode) {
            // openMode是true则为新建模式
            try {
              await createArchive(this.archiveForm);
              this.$emit("updateDate");
              this.$Message.success("新建项目成功");
            } catch (error) {
              this.$Message.error("新建项目失败", error);
            } finally {
              this.loading = false;
              this.isSaveRange = false;
              this.close();
            }
          } else {
            // openMode是false则为编辑模式
            try {
              await updateArchive(this.archiveForm.id, this.archiveForm);
              this.$emit("updateDate");
              this.$Message.success("编辑成功");
            } catch (error) {
              this.$Message.error("编辑失败", error);
            } finally {
              this.loading = false;
              this.isSaveRange = false;
              this.close();
            }
          }
        } else {
          this.createArchiveStatus = true;
          this.$Message.error("请正确填写表单信息");
          this.loading = false;
        }
      });
    },
    mapReady(para) {
      this.mapComponent = this.$refs.eyeMap;
      const mapObj = {
        map: para.map,
        mapDiv: para.mapDiv,
        mapView: para.mapView,
        mapRef: this.$refs.eyeMap
      };
      this.$store.commit(YZT_MAP_OBJECT, mapObj);
      this.mapStatus = true;
      console.log("地图渲染完成");
      console.log(
        "geometryServerUrl ==> ",
        this.$store.getters.geometryServerUrl
      );
      if (this.openMode === 2 || this.openMode === 3) {
        // 编辑、查看模式获取原来的范围线
        this.isCompileMap();
      }
    },
    async isCompileMap() {
      // 获取编辑的地图数据，将地图数据显示在地图上
      const mapConfig = await getMapConfig();
      this.mapQueryRusult = await this.mapComponent.query(
        mapConfig[6].renderUrl + "/" + mapConfig[6].renderLayerID,
        `xmbh = '${this.prjCode}'`
      );
      console.log("编辑时原来的范围线 ==> ", this.mapQueryRusult);
      const feature = this.mapQueryRusult.features[0];
      feature.symbol = {
        type: "simple-fill",
        color: [255, 255, 255, 0],
        outline: {
          // color: [0, 255, 255, 1],
          color: "#f12106",
          width: 2
        }
      };
      this.mapComponent.mapView.graphics.add(feature);
      //   this.mapComponent.cleanGraphicsLayer();
      this.mapComponent.mapView.goTo(feature);
    },
    changeShow() {
      console.log("点击了绘制地图线");
      this.isShow = !this.isShow;
      if (this.isShow) {
        console.log("打开 ==> ", this.isShow);
      } else {
        console.log("关闭", this.isShow);
      }
    },
    async saveRange() {
      if (!this.$refs["rangeSelect"].rangeGeometry) {
        if (this.openMode) {
          // 新建模式 必须绘制范围线
          this.$Message.warning("请先绘制范围线");
          return;
        } else {
          // 编辑模式 如果没有改变范围线，则范围线不变为原来空间库的范围线
          this.rings = this.mapQueryRusult.features[0].geometry.rings;
        }
      } else {
        if (this.$refs["rangeSelect"].rangeGeometry.mult) {
          const geos = this.$refs["rangeSelect"].rangeGeometry.geos.concat();
          console.log("geos ==> ", geos);
          this.rings = geos[0].rings;
        } else {
          this.rings = this.$refs["rangeSelect"].rangeGeometry.rings;
        }
      }
      const params = {
        xmbh: this.archiveForm.prjCode,
        features: [
          {
            attributes: {
              xmbh: this.archiveForm.prjCode
              // AJBH: this.archiveForm.prjCode,
              // GHMC: this.archiveForm.prjName,
              // BZLX: this.archiveForm.prjType,
              // JHND: null,
              // GHFW: this.archiveForm.prjRange,
              // QYWZ: null,
              // PWH: null,
              // BZZT: this.archiveForm.bzzt,
              // BZBM: null,
              // BPSJ: null,
              // GHPZSJ: null,
              // BZJD: this.archiveForm.phase,
              // BZZQ: null
            },
            geometry: {
              rings: this.rings
            }
          }
        ]
      };
      try {
        this.loading = true;
        if (!this.openMode) {
          await deleteFeatures(this.archiveForm.prjCode);
        }
        await featuresToDatabase(params);
        this.isSaveRange = true;
      } catch (error) {
        this.loading = false;
        this.$Message.error("项目范围线保存失败", error);
      }
    },
    clear() {
      console.log("清除");
      this.$refs["rangeSelect"].clearRangeSelect();
      this.archiveForm.polygon = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.create-archive-panel {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: $colorffffff;
  z-index: 99;
  display: flex;

  .from-container {
    width: 40%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid $colordcdcdc;

    .nav-title {
      width: 100%;
      line-height: 3rem;
      font-size: 1rem;
      font-weight: bold;
      padding: 0 0.8rem;
      border-bottom: 1px solid $colordcdcdc;
      position: relative;

      .icon-close {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 5px;
        font-size: 1.5rem;
        line-height: 3rem;
      }
    }

    .from-content {
      flex: 1;

      .archive-form {
        width: 90%;
        margin: 2rem auto;

        /deep/ .ivu-input-wrapper {
          width: 95%;
        }
      }
    }

    .btn-container {
      text-align: center;

      .cancel-btn {
        margin: 0 2rem;
      }
    }
  }

  .map-container {
    flex: 1;
    display: flex;
    flex-direction: column;

    .map-nav {
      width: 100%;
      line-height: 3rem;
      font-size: 1rem;
      font-weight: bold;
      padding-left: 0.8rem;
      border-bottom: 1px solid $colordcdcdc;

      &-btn {
        margin-left: 1rem;
      }

      .prompt {
        color: #f12106;
        font-weight: 500;
      }
    }

    .map-box {
      flex: 1;
    }
  }
}
</style>

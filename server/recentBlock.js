class RecentBlock {
  constructor(id, action_cnt, timestamp, block_num) {
    this.id = id
    this.action_cnt = action_cnt
    this.timestamp = timestamp
    this.block_num = block_num
  }
}
module.exports = RecentBlock